import type { FlightStatus, IFlightResponseData } from './aviation.types';

export const API_URL = 'http://api.aviationstack.com/v1/flights';
export const API_KEY = import.meta.env.VITE_API_KEY;

export const MOCK_DATA = {
    "pagination": {
        "limit": 20,
        "offset": 0,
        "count": 20,
        "total": 16016
    },
    "data": [
        {
            "flight_date": "2026-03-04",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Melbourne - Tullamarine Airport",
                "timezone": "Australia/Melbourne",
                "iata": "MEL",
                "icao": "YMML",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-04T01:30:00+00:00",
                "estimated": "2026-03-04T01:30:00+00:00",
                "actual": "2026-03-04T01:32:00+00:00",
                "estimated_runway": "2026-03-04T01:32:00+00:00",
                "actual_runway": "2026-03-04T01:32:00+00:00"
            },
            "arrival": {
                "airport": "Brisbane International",
                "timezone": "Australia/Brisbane",
                "iata": "BNE",
                "icao": "YBBN",
                "terminal": "D",
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-04T02:44:00+00:00",
                "delay": null,
                "estimated": "2026-03-04T02:36:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Qantas",
                "iata": "QF",
                "icao": "QFA"
            },
            "flight": {
                "number": "7290",
                "iata": "QF7290",
                "icao": "QFA7290",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "7C5BEA"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-04",
            "flight_status": "active" ,
            "departure": {
                "airport": "Sydney Kingsford Smith Airport",
                "timezone": "Australia/Sydney",
                "iata": "SYD",
                "icao": "YSSY",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-04T01:05:00+00:00",
                "estimated": "2026-03-04T01:05:00+00:00",
                "actual": "2026-03-04T01:13:00+00:00",
                "estimated_runway": "2026-03-04T01:13:00+00:00",
                "actual_runway": "2026-03-04T01:13:00+00:00"
            },
            "arrival": {
                "airport": "Brisbane International",
                "timezone": "Australia/Brisbane",
                "iata": "BNE",
                "icao": "YBBN",
                "terminal": "D",
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-04T01:35:00+00:00",
                "delay": null,
                "estimated": "2026-03-04T01:34:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Rex Airlines",
                "iata": "ZL",
                "icao": "RXA"
            },
            "flight": {
                "number": "7420",
                "iata": "ZL7420",
                "icao": "RXA7420",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "7C5D71"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-04",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Port Lincoln",
                "timezone": "Australia/Adelaide",
                "iata": "PLO",
                "icao": "YPLC",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-04T01:10:00+00:00",
                "estimated": "2026-03-04T01:10:00+00:00",
                "actual": "2026-03-04T00:38:00+00:00",
                "estimated_runway": "2026-03-04T00:38:00+00:00",
                "actual_runway": "2026-03-04T00:38:00+00:00"
            },
            "arrival": {
                "airport": "Port Augusta",
                "timezone": "Australia/Adelaide",
                "iata": "PUG",
                "icao": "YPAG",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-04T01:50:00+00:00",
                "delay": null,
                "estimated": "2026-03-04T01:28:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Sharp Airlines",
                "iata": "SH",
                "icao": "SHA"
            },
            "flight": {
                "number": null,
                "iata": null,
                "icao": null,
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "7C1C48"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-04",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Springhill",
                "timezone": "Australia/Sydney",
                "iata": "OAG",
                "icao": "YORG",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-04T01:00:00+00:00",
                "estimated": "2026-03-04T01:00:00+00:00",
                "actual": "2026-03-04T00:50:00+00:00",
                "estimated_runway": "2026-03-04T00:50:00+00:00",
                "actual_runway": "2026-03-04T00:50:00+00:00"
            },
            "arrival": {
                "airport": "Dubbo",
                "timezone": "Australia/Sydney",
                "iata": "DBO",
                "icao": "YSDU",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-04T01:23:00+00:00",
                "delay": null,
                "estimated": "2026-03-04T01:18:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "empty",
                "iata": null,
                "icao": null
            },
            "flight": {
                "number": null,
                "iata": null,
                "icao": null,
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "7C3FDF"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-04",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Sydney Kingsford Smith Airport",
                "timezone": "Australia/Sydney",
                "iata": "SYD",
                "icao": "YSSY",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-04T00:45:00+00:00",
                "estimated": "2026-03-04T00:45:00+00:00",
                "actual": "2026-03-04T00:37:00+00:00",
                "estimated_runway": "2026-03-04T00:37:00+00:00",
                "actual_runway": "2026-03-04T00:37:00+00:00"
            },
            "arrival": {
                "airport": "Melbourne - Tullamarine Airport",
                "timezone": "Australia/Melbourne",
                "iata": "MEL",
                "icao": "YMML",
                "terminal": "3",
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-04T02:02:00+00:00",
                "delay": null,
                "estimated": "2026-03-04T01:53:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Sharp Airlines",
                "iata": "SH",
                "icao": "SHA"
            },
            "flight": {
                "number": "7488",
                "iata": "SH7488",
                "icao": "SHA7488",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "7C4319"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Shimkent",
                "timezone": "Asia/Almaty",
                "iata": "CIT",
                "icao": "UAII",
                "terminal": null,
                "gate": null,
                "delay": 3,
                "scheduled": "2026-03-03T20:15:00+00:00",
                "estimated": "2026-03-03T20:15:00+00:00",
                "actual": "2026-03-03T20:39:00+00:00",
                "estimated_runway": "2026-03-03T20:39:00+00:00",
                "actual_runway": "2026-03-03T20:39:00+00:00"
            },
            "arrival": {
                "airport": null,
                "timezone": null,
                "iata": "NQZ",
                "icao": "UACC",
                "terminal": "2",
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T22:05:00+00:00",
                "delay": 3,
                "estimated": "2026-03-03T22:08:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "FlyArystan",
                "iata": "KC",
                "icao": "KZR"
            },
            "flight": {
                "number": "7328",
                "iata": "KC7328",
                "icao": "KZR7328",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "4CABFA"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Chengdu Tianfu International Airport",
                "timezone": "Asia/Chongqing",
                "iata": "TFU",
                "icao": "ZUTF",
                "terminal": "2",
                "gate": "227",
                "delay": null,
                "scheduled": "2026-03-03T20:45:00+00:00",
                "estimated": "2026-03-03T20:45:00+00:00",
                "actual": "2026-03-03T20:52:00+00:00",
                "estimated_runway": "2026-03-03T20:52:00+00:00",
                "actual_runway": "2026-03-03T20:52:00+00:00"
            },
            "arrival": {
                "airport": "Xiamen",
                "timezone": "Asia/Shanghai",
                "iata": "XMN",
                "icao": "ZSAM",
                "terminal": "4",
                "gate": "66",
                "baggage": null,
                "scheduled": "2026-03-03T23:25:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T23:01:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Shenzhen Airlines",
                "iata": "ZH",
                "icao": "CSZ"
            },
            "flight": {
                "number": "4743",
                "iata": "ZH4743",
                "icao": "CSZ4743",
                "codeshared": {
                    "airline_name": "air china ltd",
                    "airline_iata": "ca",
                    "airline_icao": "cca",
                    "flight_number": "2643",
                    "flight_iata": "ca2643",
                    "flight_icao": "cca2643"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "782214"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Chengdu Tianfu International Airport",
                "timezone": "Asia/Chongqing",
                "iata": "TFU",
                "icao": "ZUTF",
                "terminal": "2",
                "gate": "227",
                "delay": null,
                "scheduled": "2026-03-03T20:45:00+00:00",
                "estimated": "2026-03-03T20:45:00+00:00",
                "actual": "2026-03-03T20:52:00+00:00",
                "estimated_runway": "2026-03-03T20:52:00+00:00",
                "actual_runway": "2026-03-03T20:52:00+00:00"
            },
            "arrival": {
                "airport": "Xiamen",
                "timezone": "Asia/Shanghai",
                "iata": "XMN",
                "icao": "ZSAM",
                "terminal": "4",
                "gate": "66",
                "baggage": null,
                "scheduled": "2026-03-03T23:25:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T23:01:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Shandong Airlines",
                "iata": "SC",
                "icao": "CDG"
            },
            "flight": {
                "number": "5385",
                "iata": "SC5385",
                "icao": "CDG5385",
                "codeshared": {
                    "airline_name": "air china ltd",
                    "airline_iata": "ca",
                    "airline_icao": "cca",
                    "flight_number": "2643",
                    "flight_iata": "ca2643",
                    "flight_icao": "cca2643"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "782214"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Alliance",
                "timezone": "America/Denver",
                "iata": "AIA",
                "icao": "KAIA",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-03T07:30:00+00:00",
                "estimated": "2026-03-03T07:30:00+00:00",
                "actual": "2026-03-03T07:31:00+00:00",
                "estimated_runway": "2026-03-03T07:31:00+00:00",
                "actual_runway": "2026-03-03T07:31:00+00:00"
            },
            "arrival": {
                "airport": "Denver International",
                "timezone": "America/Denver",
                "iata": "DEN",
                "icao": "KDEN",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T08:30:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T08:19:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "United Airlines",
                "iata": "UA",
                "icao": "UAL"
            },
            "flight": {
                "number": "4235",
                "iata": "UA4235",
                "icao": "UAL4235",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "AC3F92"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Bartow",
                "timezone": "America/New_York",
                "iata": "BOW",
                "icao": "KBOW",
                "terminal": null,
                "gate": null,
                "delay": 7,
                "scheduled": "2026-03-03T08:00:00+00:00",
                "estimated": "2026-03-03T08:00:00+00:00",
                "actual": "2026-03-03T08:14:00+00:00",
                "estimated_runway": "2026-03-03T08:14:00+00:00",
                "actual_runway": "2026-03-03T08:14:00+00:00"
            },
            "arrival": {
                "airport": "Treasure Cay",
                "timezone": "America/Nassau",
                "iata": "TCB",
                "icao": "MYAT",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T09:34:00+00:00",
                "delay": 7,
                "estimated": "2026-03-03T09:41:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "empty",
                "iata": null,
                "icao": null
            },
            "flight": {
                "number": null,
                "iata": null,
                "icao": null,
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "AA01B5"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": null,
                "timezone": null,
                "iata": "NBJ",
                "icao": "FNBJ",
                "terminal": null,
                "gate": null,
                "delay": 7,
                "scheduled": "2026-03-03T13:25:00+00:00",
                "estimated": "2026-03-03T13:25:00+00:00",
                "actual": "2026-03-03T13:47:00+00:00",
                "estimated_runway": "2026-03-03T13:47:00+00:00",
                "actual_runway": "2026-03-03T13:47:00+00:00"
            },
            "arrival": {
                "airport": "Oliver Reginald Tambo International (Jan Smuts International)",
                "timezone": "Africa/Johannesburg",
                "iata": "JNB",
                "icao": "FAOR",
                "terminal": "A",
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T17:50:00+00:00",
                "delay": 7,
                "estimated": "2026-03-03T17:57:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Qatar Airways",
                "iata": "QR",
                "icao": "QTR"
            },
            "flight": {
                "number": "8380",
                "iata": "QR8380",
                "icao": "QTR8380",
                "codeshared": {
                    "airline_name": "south african airlink",
                    "airline_iata": "4z",
                    "airline_icao": "lnk",
                    "flight_number": "45",
                    "flight_iata": "4z45",
                    "flight_icao": "lnk45"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "00834B"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": null,
                "timezone": null,
                "iata": "NBJ",
                "icao": "FNBJ",
                "terminal": null,
                "gate": null,
                "delay": 7,
                "scheduled": "2026-03-03T13:25:00+00:00",
                "estimated": "2026-03-03T13:25:00+00:00",
                "actual": "2026-03-03T13:47:00+00:00",
                "estimated_runway": "2026-03-03T13:47:00+00:00",
                "actual_runway": "2026-03-03T13:47:00+00:00"
            },
            "arrival": {
                "airport": "Oliver Reginald Tambo International (Jan Smuts International)",
                "timezone": "Africa/Johannesburg",
                "iata": "JNB",
                "icao": "FAOR",
                "terminal": "A",
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T17:50:00+00:00",
                "delay": 7,
                "estimated": "2026-03-03T17:57:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "KLM",
                "iata": "KL",
                "icao": "KLM"
            },
            "flight": {
                "number": "4643",
                "iata": "KL4643",
                "icao": "KLM4643",
                "codeshared": {
                    "airline_name": "south african airlink",
                    "airline_iata": "4z",
                    "airline_icao": "lnk",
                    "flight_number": "45",
                    "flight_iata": "4z45",
                    "flight_icao": "lnk45"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "00834B"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": null,
                "timezone": null,
                "iata": "QNK",
                "icao": "KSPK",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-03T08:00:00+00:00",
                "estimated": "2026-03-03T08:00:00+00:00",
                "actual": "2026-03-03T07:38:00+00:00",
                "estimated_runway": "2026-03-03T07:38:00+00:00",
                "actual_runway": "2026-03-03T07:38:00+00:00"
            },
            "arrival": {
                "airport": "Williams Gateway",
                "timezone": "America/Phoenix",
                "iata": "AZA",
                "icao": "KIWA",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T10:42:00+00:00",
                "delay": null,
                "estimated": null,
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "empty",
                "iata": null,
                "icao": null
            },
            "flight": {
                "number": null,
                "iata": null,
                "icao": null,
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "A00500"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Xinyang Minggang Airport",
                "timezone": null,
                "iata": "XAI",
                "icao": "ZHXY",
                "terminal": null,
                "gate": "2",
                "delay": null,
                "scheduled": "2026-03-03T21:50:00+00:00",
                "estimated": "2026-03-03T21:50:00+00:00",
                "actual": "2026-03-03T21:37:00+00:00",
                "estimated_runway": "2026-03-03T21:37:00+00:00",
                "actual_runway": "2026-03-03T21:37:00+00:00"
            },
            "arrival": {
                "airport": "Shanghai Pudong International",
                "timezone": "Asia/Shanghai",
                "iata": "PVG",
                "icao": "ZSPD",
                "terminal": "1",
                "gate": null,
                "baggage": "5",
                "scheduled": "2026-03-03T23:15:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T22:47:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Etihad Airways",
                "iata": "EY",
                "icao": "ETD"
            },
            "flight": {
                "number": "5915",
                "iata": "EY5915",
                "icao": "ETD5915",
                "codeshared": {
                    "airline_name": "china eastern airlines",
                    "airline_iata": "mu",
                    "airline_icao": "ces",
                    "flight_number": "5440",
                    "flight_iata": "mu5440",
                    "flight_icao": "ces5440"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "78093A"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Xinyang Minggang Airport",
                "timezone": null,
                "iata": "XAI",
                "icao": "ZHXY",
                "terminal": null,
                "gate": "2",
                "delay": null,
                "scheduled": "2026-03-03T21:50:00+00:00",
                "estimated": "2026-03-03T21:50:00+00:00",
                "actual": "2026-03-03T21:37:00+00:00",
                "estimated_runway": "2026-03-03T21:37:00+00:00",
                "actual_runway": "2026-03-03T21:37:00+00:00"
            },
            "arrival": {
                "airport": "Shanghai Pudong International",
                "timezone": "Asia/Shanghai",
                "iata": "PVG",
                "icao": "ZSPD",
                "terminal": "1",
                "gate": null,
                "baggage": "5",
                "scheduled": "2026-03-03T23:15:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T22:47:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Juneyao Airlines",
                "iata": "HO",
                "icao": "DKH"
            },
            "flight": {
                "number": "5715",
                "iata": "HO5715",
                "icao": "DKH5715",
                "codeshared": {
                    "airline_name": "china eastern airlines",
                    "airline_iata": "mu",
                    "airline_icao": "ces",
                    "flight_number": "5440",
                    "flight_iata": "mu5440",
                    "flight_icao": "ces5440"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "78093A"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Kitchener-Waterloo Regional",
                "timezone": "America/Toronto",
                "iata": "YKF",
                "icao": "CYKF",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-03T08:30:00+00:00",
                "estimated": "2026-03-03T08:30:00+00:00",
                "actual": "2026-03-03T08:33:00+00:00",
                "estimated_runway": "2026-03-03T08:33:00+00:00",
                "actual_runway": "2026-03-03T08:33:00+00:00"
            },
            "arrival": {
                "airport": "Saint John",
                "timezone": "America/Moncton",
                "iata": "YSJ",
                "icao": "CYSJ",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T11:14:00+00:00",
                "delay": null,
                "estimated": null,
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Flightpath Charter Airways",
                "iata": null,
                "icao": "KNT"
            },
            "flight": {
                "number": null,
                "iata": null,
                "icao": "KNT",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "C07565"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Vero Beach Municipal",
                "timezone": "America/New_York",
                "iata": "VRB",
                "icao": "KVRB",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-03T09:40:00+00:00",
                "estimated": "2026-03-03T09:40:00+00:00",
                "actual": "2026-03-03T08:03:00+00:00",
                "estimated_runway": "2026-03-03T08:03:00+00:00",
                "actual_runway": "2026-03-03T08:03:00+00:00"
            },
            "arrival": {
                "airport": "Orlando Sanford International",
                "timezone": "America/New_York",
                "iata": "SFB",
                "icao": "KSFB",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T10:50:00+00:00",
                "delay": null,
                "estimated": null,
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Delta Airlines",
                "iata": "DL",
                "icao": "DAL"
            },
            "flight": {
                "number": "658",
                "iata": "DL658",
                "icao": "A74ECC",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "A63DFF"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Sofia",
                "timezone": "Europe/Sofia",
                "iata": "SOF",
                "icao": "LBSF",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-03T16:00:00+00:00",
                "estimated": "2026-03-03T16:00:00+00:00",
                "actual": "2026-03-03T16:46:00+00:00",
                "estimated_runway": "2026-03-03T16:46:00+00:00",
                "actual_runway": "2026-03-03T16:46:00+00:00"
            },
            "arrival": {
                "airport": "M. R. Štefánika",
                "timezone": "Europe/Bratislava",
                "iata": "BTS",
                "icao": "LZIB",
                "terminal": null,
                "gate": null,
                "baggage": null,
                "scheduled": "2026-03-03T17:09:00+00:00",
                "delay": null,
                "estimated": null,
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Bulgaria Air",
                "iata": "FB",
                "icao": "LZB"
            },
            "flight": {
                "number": "FB1833",
                "iata": "FB1833",
                "icao": "LZB1833",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "451D85"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Chiang Rai",
                "timezone": "Asia/Bangkok",
                "iata": "CEI",
                "icao": "VTCT",
                "terminal": null,
                "gate": "6",
                "delay": null,
                "scheduled": "2026-03-03T21:30:00+00:00",
                "estimated": "2026-03-03T21:30:00+00:00",
                "actual": "2026-03-03T21:32:00+00:00",
                "estimated_runway": "2026-03-03T21:32:00+00:00",
                "actual_runway": "2026-03-03T21:32:00+00:00"
            },
            "arrival": {
                "airport": "Don Muang",
                "timezone": "Asia/Bangkok",
                "iata": "DMK",
                "icao": "VTBD",
                "terminal": "2",
                "gate": null,
                "baggage": "14",
                "scheduled": "2026-03-03T22:50:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T22:34:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Thai Lion Air",
                "iata": "TG",
                "icao": "THA"
            },
            "flight": {
                "number": "545",
                "iata": "TG545",
                "icao": "THA545",
                "codeshared": null
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "8830F7"
            },
            "live": null
        },
        {
            "flight_date": "2026-03-03",
            "flight_status": 'active' as FlightStatus,
            "departure": {
                "airport": "Techo International Airport",
                "timezone": "Asia/Phnom_Penh",
                "iata": "KTI",
                "icao": "VDTI",
                "terminal": null,
                "gate": null,
                "delay": null,
                "scheduled": "2026-03-03T19:40:00+00:00",
                "estimated": "2026-03-03T19:40:00+00:00",
                "actual": "2026-03-03T20:07:00+00:00",
                "estimated_runway": "2026-03-03T20:07:00+00:00",
                "actual_runway": "2026-03-03T20:07:00+00:00"
            },
            "arrival": {
                "airport": "Singapore Changi",
                "timezone": "Asia/Singapore",
                "iata": "SIN",
                "icao": "WSSS",
                "terminal": "2",
                "gate": "F35R",
                "baggage": "36",
                "scheduled": "2026-03-03T22:50:00+00:00",
                "delay": null,
                "estimated": "2026-03-03T22:48:00+00:00",
                "actual": null,
                "estimated_runway": null,
                "actual_runway": null
            },
            "airline": {
                "name": "Virgin Australia",
                "iata": "VA",
                "icao": "VOZ"
            },
            "flight": {
                "number": "5477",
                "iata": "VA5477",
                "icao": "VOZ5477",
                "codeshared": {
                    "airline_name": "singapore airlines",
                    "airline_iata": "sq",
                    "airline_icao": "sia",
                    "flight_number": "157",
                    "flight_iata": "sq157",
                    "flight_icao": "sia157"
                }
            },
            "aircraft": {
                "registration": null,
                "iata": null,
                "icao": null,
                "icao24": "76B44B"
            },
            "live": null
        }
    ] as IFlightResponseData[]
}