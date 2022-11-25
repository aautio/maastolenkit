
import assert from 'node:assert'
import { after, before, describe, it } from 'node:test'

import { serve, fakeApiWithHappyCases } from './fake-strava-api.js'

import { onRequestPost } from '../functions/latest-polyline.js'

function mockContext(functionPath) {
    return {
        request: new Request("https://example.com" + functionPath),
        functionPath: functionPath,
        env: { STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET }
    }
}

describe("Workflows for Strava authorization and polyline retrieval", () => {
    let originalFetch = global.fetch
    let server = serve(fakeApiWithHappyCases, 8877)

    before(async () => {
        // Capturing requests to Strava to our own test server
        global.fetch = (resource, options) => {
            const redirectedResource = resource.replace("https://www.strava.com", "http://localhost:8877")
            return originalFetch(redirectedResource, options)
        }
    })

    after(async () => {
        global.fetch = originalFetch
        server.close()
    })

    it("Can fetch polyline", async () => {
        const ctx = mockContext("/authorize?code=1234&scope=activity%3Aread_all")

        const res = await onRequestPost(ctx)

        assert.equal(res.status, 200)
        // Polyline should match the one provided by `fakeApiWithHappyCases`
        assert.match((await res.json()).polyline, /^ki{eFvqfiVqAWQIGEEKAYJgBVqDJ.*$/)
    })
})
