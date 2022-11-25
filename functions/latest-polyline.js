/// <reference types="@cloudflare/workers-types" />

const STRAVA_CLIENT_ID = 8333

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);
    return response;
}

function getAuthCode(url) {
    const urlSearchParams =
        new URLSearchParams(new URL(url).search)

    const error = urlSearchParams.get("error")
    const code = urlSearchParams.get("code")
    const scope = urlSearchParams.get("scope")

    if (error !== null || code === null || scope === null) {
        throw new Error("No valid code found")
    }

    // Need authorization for either "activity:read" or "activity:read_all" or both to access any activities.
    // Authorization for "read" does not provide access to activities.
    const grantedScopes = scope.split(",")
    if (!grantedScopes.includes("activity:read") && !grantedScopes.includes("activity:read_all")) {
        throw new Error("Not authorized to read activities")
    }

    return code
}

async function exchangeCodeToAccessToken(code, STRAVA_CLIENT_SECRET) {
    const tokenResponse = await fetchWithTimeout(
        `https://www.strava.com/api/v3/oauth/token?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`,
        { timeout: 5000, method: "POST" })

    if (tokenResponse.status !== 200) {
        throw new Error("Failed to exchange code to access token")
    }

    const { access_token } = await tokenResponse.json()

    return access_token
}

async function getLatestActivityId(access_token) {
    const activitiesResponse = await fetchWithTimeout(
        `https://www.strava.com/api/v3/athlete/activities`,
        { timeout: 5000, headers: { 'Authorization': `Bearer ${access_token}` } }
    )

    if (activitiesResponse.status !== 200) {
        throw new Error("Failed to get activities")
    }

    const [{ id: latest_activity_id }] = await activitiesResponse.json()

    return latest_activity_id
}

async function getActivityPolyline(access_token, activity_id) {
    const activityResponse = await fetchWithTimeout(
        `https://www.strava.com/api/v3/activities/${activity_id}`,
        { timeout: 5000, headers: { 'Authorization': `Bearer ${access_token}` } }
    )

    if (activityResponse.status !== 200) {
        throw new Error("Failed to get activity")
    }

    const { map: { polyline } } = await activityResponse.json()

    return polyline
}

async function deAuthorize(access_token) {
    const deAuthResponse = await fetchWithTimeout(
        `https://www.strava.com/api/v3/oauth/deauthorize?access_token=${access_token}`,
        { timeout: 5000, method: "POST" })

    if (deAuthResponse.status !== 200) {
        throw new Error("Failed to deauthorize app")
    }
}

/**
 * @type { PagesFunction }
 */
export const onRequestPost = async (context) => {
    let code
    try {
        code = getAuthCode(context.request.url)
    }
    catch (err) {
        console.error(err)
        return new Response("Bad request: Error from Strava, no valid auth code or missing access to activities.", { status: 400 })
    }

    try {
        const access_token = await exchangeCodeToAccessToken(code, context.env.STRAVA_CLIENT_SECRET)

        const latest_activity_id = await getLatestActivityId(access_token)

        const polyline = await getActivityPolyline(access_token, latest_activity_id)

        //await deAuthorize(access_token).catch(err => {
        //    console.error("Could not deauthorize app due to error", err)
        //})

        return new Response(JSON.stringify({ polyline }), { headers: { 'content-type': 'application/json' } })
    }
    catch (err) {
        console.error(err)
        return new Response("Internal Server Error while fetching the polyline for latest activity.", { status: 500 })
    }
}
