import http from 'node:http'
import url from 'node:url'

/**
 * 
 * @returns { http.Server }
 */
export function serve(handlers, port) {
    const requestListener = function (req, res) {
        const reqPathname = url.parse(req.url).pathname
        const method = req.method

        const key = `${method} ${reqPathname}`

        const handler = handlers[key]

        if (handler == null) {
            res.writeHead(404)
            res.end()
        }
        else {
            handler(req, res)
        }
    }

    const server = http.createServer(requestListener)
    server.listen(port)

    return server
}

export const fakeApiWithHappyCases = {
    "POST /api/v3/oauth/token": (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({
            "token_type": "Bearer",
            "access_token": "a9b723...",
            "expires_at": 1568775134,
            "expires_in": 20566,
            "refresh_token": "b5c569..."
        }))
        res.end()
    },
    "GET /api/v3/athlete/activities": (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(
            [{
                "resource_state": 2,
                "athlete": {
                    "id": 134815,
                    "resource_state": 1
                },
                "name": "Happy Friday",
                "distance": 24931.4,
                "moving_time": 4500,
                "elapsed_time": 4500,
                "total_elevation_gain": 0,
                "type": "Ride",
                "sport_type": "MountainBikeRide",
                "workout_type": null,
                "id": 154504250376823,
                "external_id": "garmin_push_12345678987654321",
                "upload_id": 987654321234567891234,
                "start_date": "2018-05-02T12:15:09Z",
                "start_date_local": "2018-05-02T05:15:09Z",
                "timezone": "(GMT-08:00) America/Los_Angeles",
                "utc_offset": -25200,
                "start_latlng": null,
                "end_latlng": null,
                "location_city": null,
                "location_state": null,
                "location_country": "United States",
                "achievement_count": 0,
                "kudos_count": 3,
                "comment_count": 1,
                "athlete_count": 1,
                "photo_count": 0,
                "map": {
                    "id": "a12345678987654321",
                    "summary_polyline": null,
                    "resource_state": 2
                },
                "trainer": true,
                "commute": false,
                "manual": false,
                "private": false,
                "flagged": false,
                "gear_id": "b12345678987654321",
                "from_accepted_tag": false,
                "average_speed": 5.54,
                "max_speed": 11,
                "average_cadence": 67.1,
                "average_watts": 175.3,
                "weighted_average_watts": 210,
                "kilojoules": 788.7,
                "device_watts": true,
                "has_heartrate": true,
                "average_heartrate": 140.3,
                "max_heartrate": 178,
                "max_watts": 406,
                "pr_count": 0,
                "total_photo_count": 1,
                "has_kudoed": false,
                "suffer_score": 82
            }, {
                "resource_state": 2,
                "athlete": {
                    "id": 167560,
                    "resource_state": 1
                },
                "name": "Bondcliff",
                "distance": 23676.5,
                "moving_time": 5400,
                "elapsed_time": 5400,
                "total_elevation_gain": 0,
                "type": "Ride",
                "sport_type": "MountainBikeRide",
                "workout_type": null,
                "id": 1234567809,
                "external_id": "garmin_push_12345678987654321",
                "upload_id": 1234567819,
                "start_date": "2018-04-30T12:35:51Z",
                "start_date_local": "2018-04-30T05:35:51Z",
                "timezone": "(GMT-08:00) America/Los_Angeles",
                "utc_offset": -25200,
                "start_latlng": null,
                "end_latlng": null,
                "location_city": null,
                "location_state": null,
                "location_country": "United States",
                "achievement_count": 0,
                "kudos_count": 4,
                "comment_count": 0,
                "athlete_count": 1,
                "photo_count": 0,
                "map": {
                    "id": "a12345689",
                    "summary_polyline": null,
                    "resource_state": 2
                },
                "trainer": true,
                "commute": false,
                "manual": false,
                "private": false,
                "flagged": false,
                "gear_id": "b12345678912343",
                "from_accepted_tag": false,
                "average_speed": 4.385,
                "max_speed": 8.8,
                "average_cadence": 69.8,
                "average_watts": 200,
                "weighted_average_watts": 214,
                "kilojoules": 1080,
                "device_watts": true,
                "has_heartrate": true,
                "average_heartrate": 152.4,
                "max_heartrate": 183,
                "max_watts": 403,
                "pr_count": 0,
                "total_photo_count": 1,
                "has_kudoed": false,
                "suffer_score": 162
            }]

        ))
        res.end()
    },
    "GET /api/v3/activities/154504250376823": (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(
            {
                "id": 12345678987654321,
                "resource_state": 3,
                "external_id": "garmin_push_12345678987654321",
                "upload_id": 98765432123456789,
                "athlete": {
                    "id": 134815,
                    "resource_state": 1
                },
                "name": "Happy Friday",
                "distance": 28099,
                "moving_time": 4207,
                "elapsed_time": 4410,
                "total_elevation_gain": 516,
                "type": "Ride",
                "sport_type": "MountainBikeRide",
                "start_date": "2018-02-16T14:52:54Z",
                "start_date_local": "2018-02-16T06:52:54Z",
                "timezone": "(GMT-08:00) America/Los_Angeles",
                "utc_offset": -28800,
                "start_latlng": [37.83, -122.26],
                "end_latlng": [37.83, -122.26],
                "achievement_count": 0,
                "kudos_count": 19,
                "comment_count": 0,
                "athlete_count": 1,
                "photo_count": 0,
                "map": {
                    "id": "a1410355832",
                    "polyline": "ki{eFvqfiVqAWQIGEEKAYJgBVqDJ{BHa@jAkNJw@Pw@V{APs@^aABQAOEQGKoJ_FuJkFqAo@{A}@sH{DiAs@Q]?WVy@`@oBt@_CB]KYMMkB{AQEI@WT{BlE{@zAQPI@ICsCqA_BcAeCmAaFmCqIoEcLeG}KcG}A}@cDaBiDsByAkAuBqBi@y@_@o@o@kB}BgIoA_EUkAMcACa@BeBBq@LaAJe@b@uA`@_AdBcD`@iAPq@RgALqAB{@EqAyAoOCy@AmCBmANqBLqAZkB\\iCPiBJwCCsASiCq@iD]eA]y@[i@w@mAa@i@k@g@kAw@i@Ya@Q]EWFMLa@~BYpAFNpA`Aj@n@X`@V`AHh@JfB@xAMvAGZGHIDIAWOEQNcC@sACYK[MSOMe@QKKKYOs@UYQISCQ?Q@WNo@r@OHGAGCKOQ_BU}@MQGG]Io@@c@FYNg@d@s@d@ODQAMOMaASs@_@a@SESAQDqBn@a@RO?KK?UBU\\kA@Y?WMo@Iy@GWQ_@WSSGg@AkABQB_Ap@_A^o@b@Q@o@IS@OHi@n@OFS?OI}@iAQMQGQC}@DOIIUK{@IUOMyBo@kASOKIQCa@L[|AgATWN[He@?QKw@FOPCh@Fx@l@TDLELKl@aAHIJEX@r@ZTDV@LENQVg@RkA@c@MeA?WFOPMf@Ej@Fj@@LGHKDM?_@_@iC?a@HKRIl@NT?FCHMFW?YEYGWQa@GYBiAIq@Gq@L_BHSHK|@WJETSLQZs@z@_A~@uA^U`@G\\CRB\\Tl@p@Th@JZ^bB`@lAHLXVLDP?LGFSKiDBo@d@wBVi@R]VYVE\\@`@Lh@Fh@CzAk@RSDQA]GYe@eAGWSiBAWBWBIJORK`@KPOPSTg@h@}Ad@o@F[E_@EGMKUGmAEYGMIMYKs@?a@J}@@_BD_@HQJMx@e@LKHKHWAo@UoAAWFmAH}@?w@C[YwAAc@HSNM|Ao@rA}@zAq@`@a@j@eAxAuBXQj@MXSR[b@gAFg@?YISOGaAHi@Xw@v@_@d@WRSFqARUHQJc@d@m@`A[VSFUBcAEU@WFULUPa@v@Y~@UrBc@dBI~@?l@P~ABt@N`HEjA]zAEp@@p@TrBCl@CTQb@k@dAg@jAU^KJYLK@k@A[Js@d@a@b@]RgBl@[FMAw@[]G]?m@D_@F]P[Vu@t@[TMF_@Do@E_@@q@P]PWZUZw@vAkAlAGJOj@IlAMd@OR{@p@a@d@sBpD]v@a@`Aa@n@]TODgBVk@Pe@^cBfBc@Rs@La@RSPm@|@wCpDS^Wp@QZML{@l@qBbCYd@k@lAIVCZBZNTr@`@RRHZANIZQPKDW@e@CaASU?I@YTKRQx@@\\VmALYRQLCL?v@P|@D\\GJEFKDM@OCa@COOYIGm@YMUCM@]JYr@uAx@kAt@}@jAeAPWbAkBj@s@bAiAz@oAj@m@VQlAc@VQ~@aA`Au@p@Q`AIv@MZORUV_@p@iB|AoCh@q@dAaANUNWH[N{AJ[^m@t@_Av@wA\\a@`@W`@In@Al@B^E`@Wl@u@\\[VQ\\K`@Eb@?R@dAZP@d@CRExAs@\\Yt@{@LG\\MjAATINOXo@d@kAl@_AHYBOCe@QiBCm@Fq@\\wADo@AyGEeBWuB@YHu@Tu@Lk@VcCTo@d@aA\\WJE`@G~@FP?VI\\U~@sANO`@SfAMj@U\\WjAsAXS`@UNENALBHFFL?^Ml@Uj@]b@q@RUJSPkChEc@XcAb@sA|@]PaA\\OJKNER?TDTNj@Jn@?p@OfC@ZR`B@VCV_@n@{@l@WbACv@OlABnAPl@LNNHbBBNBLFFJ@^GLg@x@i@|AMP[X}@XOJKPET?l@LhAFXp@fBDRCd@S\\_@Ps@PQ@}A]S?QDe@V]b@MR[fAKt@ErAF~CANILYDKGIKe@{@Yy@e@sB[gA[c@e@YUCU?WBUHUNQPq@`AiArAMV[^e@Zc@JQJKNMz@?r@Bb@PfAAfA@VVbADn@E`@KHSEe@SMAKDKFM\\^dDCh@m@LoAQ_@@MFOZLfBEl@QbASd@KLQBOAaAc@QAQ@QHc@v@ONMJOBOCg@c@]O[EMBKFGL?RHv@ARERGNe@h@{@h@WVGNDt@JLNFPFz@LdBf@f@PJNHPF`ADPJJJDl@I`@B^Tp@bALJNDNALIf@i@PGPCt@DNE`@Uv@[dAw@RITGRCtAARBPJLPJRZxB?VEX_@vAAR?RDNHJJBh@UnBm@h@IRDRJNNJPNbBFRJLLBLCzAmAd@Uf@Gf@?P@PFJNHPFTH`BDTHNJJJ@LG`@m@^YPER@RDPHNNJRLn@HRLN^VNPHTFX@\\UlDFb@FHh@NP@HKPsB?}ASkCQ{@[y@q@}@cA{@KOCQDa@t@{CFGJCf@Nl@ZtA~@r@p@`@h@rAxBd@rA\\fARdAPjANrB?f@AtBCd@QfBkAjJOlBChA?rBFrBNlBdAfKFzAC~@Iz@Mz@Sv@s@jBmAxBi@hAWt@Sv@Qx@O`BA`@?dAPfBVpAd@`BfBlFf@fBdA~Cr@pAz@fApBhBjAt@H?IL?FBFJLx@^lHvDvh@~XnElCbAd@pGhDbAb@nAr@`Ad@`GhDnBbAxCbBrWhNJJDPARGP_@t@Qh@]pAUtAoA`Ny@jJApBBNFLJFJBv@Hb@HBF?\\",
                    "resource_state": 3,
                    "summary_polyline": "ki{eFvqfiVsBmA`Feh@qg@iX`B}JeCcCqGjIq~@kf@cM{KeHeX`@_GdGkSeBiXtB}YuEkPwFyDeAzAe@pC~DfGc@bIOsGmCcEiD~@oBuEkFhBcBmDiEfAVuDiAuD}NnDaNiIlCyDD_CtJKv@wGhD]YyEzBo@g@uKxGmHpCGtEtI~AuLrHkAcAaIvEgH_EaDR_FpBuBg@sNxHqEtHgLoTpIiCzKNr[sB|Es\\`JyObYeMbGsMnPsAfDxAnD}DBu@bCx@{BbEEyAoD`AmChNoQzMoGhOwX|[yIzBeFKg[zAkIdU_LiHxK}HzEh@vM_BtBg@xGzDbCcF~GhArHaIfByAhLsDiJuC?_HbHd@nL_Cz@ZnEkDDy@hHwJLiCbIrNrIvN_EfAjDWlEnEiAfBxDlFkBfBtEfDaAzBvDKdFx@|@XgJmDsHhAgD`GfElEzOwBnYdBxXgGlSc@bGdHpW|HdJztBnhAgFxc@HnCvBdA"
                },
                "trainer": false,
                "commute": false,
                "manual": false,
                "private": false,
                "flagged": false,
                "gear_id": "b12345678987654321",
                "from_accepted_tag": false,
                "average_speed": 6.679,
                "max_speed": 18.5,
                "average_cadence": 78.5,
                "average_temp": 4,
                "average_watts": 185.5,
                "weighted_average_watts": 230,
                "kilojoules": 780.5,
                "device_watts": true,
                "has_heartrate": false,
                "max_watts": 743,
                "elev_high": 446.6,
                "elev_low": 17.2,
                "pr_count": 0,
                "total_photo_count": 2,
                "has_kudoed": false,
                "workout_type": 10,
                "suffer_score": null,
                "description": "",
                "calories": 870.2,
                "segment_efforts": [{
                    "id": 12345678987654321,
                    "resource_state": 2,
                    "name": "Tunnel Rd.",
                    "activity": {
                        "id": 12345678987654321,
                        "resource_state": 1
                    },
                    "athlete": {
                        "id": 134815,
                        "resource_state": 1
                    },
                    "elapsed_time": 2038,
                    "moving_time": 2038,
                    "start_date": "2018-02-16T14:56:25Z",
                    "start_date_local": "2018-02-16T06:56:25Z",
                    "distance": 9434.8,
                    "start_index": 211,
                    "end_index": 2246,
                    "average_cadence": 78.6,
                    "device_watts": true,
                    "average_watts": 237.6,
                    "segment": {
                        "id": 673683,
                        "resource_state": 2,
                        "name": "Tunnel Rd.",
                        "activity_type": "Ride",
                        "distance": 9220.7,
                        "average_grade": 4.2,
                        "maximum_grade": 25.8,
                        "elevation_high": 426.5,
                        "elevation_low": 43.4,
                        "start_latlng": [37.8346153, -122.2520872],
                        "end_latlng": [37.8476261, -122.2008944],
                        "climb_category": 3,
                        "city": "Oakland",
                        "state": "CA",
                        "country": "United States",
                        "private": false,
                        "hazardous": false,
                        "starred": false
                    },
                    "kom_rank": null,
                    "pr_rank": null,
                    "achievements": [],
                    "hidden": false
                }],
                "splits_metric": [{
                    "distance": 1001.5,
                    "elapsed_time": 141,
                    "elevation_difference": 4.4,
                    "moving_time": 141,
                    "split": 1,
                    "average_speed": 7.1,
                    "pace_zone": 0
                }],
                "laps": [{
                    "id": 4479306946,
                    "resource_state": 2,
                    "name": "Lap 1",
                    "activity": {
                        "id": 1410355832,
                        "resource_state": 1
                    },
                    "athlete": {
                        "id": 134815,
                        "resource_state": 1
                    },
                    "elapsed_time": 1573,
                    "moving_time": 1569,
                    "start_date": "2018-02-16T14:52:54Z",
                    "start_date_local": "2018-02-16T06:52:54Z",
                    "distance": 8046.72,
                    "start_index": 0,
                    "end_index": 1570,
                    "total_elevation_gain": 276,
                    "average_speed": 5.12,
                    "max_speed": 9.5,
                    "average_cadence": 78.6,
                    "device_watts": true,
                    "average_watts": 233.1,
                    "lap_index": 1,
                    "split": 1
                }],
                "gear": {
                    "id": "b12345678987654321",
                    "primary": true,
                    "name": "Tarmac",
                    "resource_state": 2,
                    "distance": 32547610
                },
                "partner_brand_tag": null,
                "photos": {
                    "primary": {
                        "id": null,
                        "unique_id": "3FDGKL3-204E-4867-9E8D-89FC79EAAE17",
                        "urls": {
                            "100": "https://dgtzuqphqg23d.cloudfront.net/Bv93zv5t_mr57v0wXFbY_JyvtucgmU5Ym6N9z_bKeUI-128x96.jpg",
                            "600": "https://dgtzuqphqg23d.cloudfront.net/Bv93zv5t_mr57v0wXFbY_JyvtucgmU5Ym6N9z_bKeUI-768x576.jpg"
                        },
                        "source": 1
                    },
                    "use_primary_photo": true,
                    "count": 2
                },
                "highlighted_kudosers": [{
                    "destination_url": "strava://athletes/12345678987654321",
                    "display_name": "Marianne V.",
                    "avatar_url": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/12345678987654321/12345678987654321/3/medium.jpg",
                    "show_name": true
                }],
                "hide_from_home": false,
                "device_name": "Garmin Edge 1030",
                "embed_token": "18e4615989b47dd4ff3dc711b0aa4502e4b311a9",
                "segment_leaderboard_opt_out": false,
                "leaderboard_opt_out": false
            }
        ))
        res.end()
    },
    "POST /api/v3/oauth/deauthorize": (req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify({
        }))
        res.end()
    }
}