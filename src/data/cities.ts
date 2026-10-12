export interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  timezone: string; // IANA name
  lat: number;
  lng: number;
  population: number;
  region: string;
  seoSlug: string;
  seoTitle: string;
}

export const CITIES_DATABASE: City[] = [
  // ==========================================
  // 🇺🇸 ESTADOS UNIDOS (COBERTURA COMPLETA DE CIUDADES PRINCIPALES)
  // ==========================================
  
  // --- Costa Este & Noreste (Eastern Time Zone) ---
  {
    id: "new-york",
    name: "Nueva York",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 40.7128,
    lng: -74.0060,
    population: 8804190,
    region: "Norteamérica",
    seoSlug: "hora-en-nueva-york",
    seoTitle: "Hora exacta en Nueva York, Estados Unidos"
  },
  {
    id: "washington-dc",
    name: "Washington D.C.",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 38.9072,
    lng: -77.0369,
    population: 689545,
    region: "Norteamérica",
    seoSlug: "hora-en-washington-dc",
    seoTitle: "Hora exacta en Washington D.C., Estados Unidos"
  },
  {
    id: "miami",
    name: "Miami",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 25.7617,
    lng: -80.1918,
    population: 442241,
    region: "Norteamérica",
    seoSlug: "hora-en-miami",
    seoTitle: "Hora exacta en Miami, Florida, EE.UU."
  },
  {
    id: "orlando",
    name: "Orlando",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 28.5383,
    lng: -81.3792,
    population: 307573,
    region: "Norteamérica",
    seoSlug: "hora-en-orlando",
    seoTitle: "Hora exacta en Orlando, Florida, EE.UU."
  },
  {
    id: "tampa",
    name: "Tampa",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 27.9506,
    lng: -82.4572,
    population: 384959,
    region: "Norteamérica",
    seoSlug: "hora-en-tampa",
    seoTitle: "Hora exacta en Tampa, Florida, EE.UU."
  },
  {
    id: "jacksonville",
    name: "Jacksonville",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 30.3322,
    lng: -81.6557,
    population: 949611,
    region: "Norteamérica",
    seoSlug: "hora-en-jacksonville",
    seoTitle: "Hora exacta en Jacksonville, Florida, EE.UU."
  },
  {
    id: "atlanta",
    name: "Atlanta",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 33.7490,
    lng: -84.3880,
    population: 498715,
    region: "Norteamérica",
    seoSlug: "hora-en-atlanta",
    seoTitle: "Hora exacta en Atlanta, Georgia, EE.UU."
  },
  {
    id: "charlotte",
    name: "Charlotte",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 35.2271,
    lng: -80.8431,
    population: 874579,
    region: "Norteamérica",
    seoSlug: "hora-en-charlotte",
    seoTitle: "Hora exacta en Charlotte, Carolina del Norte, EE.UU."
  },
  {
    id: "raleigh",
    name: "Raleigh",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 35.7796,
    lng: -78.6382,
    population: 467665,
    region: "Norteamérica",
    seoSlug: "hora-en-raleigh",
    seoTitle: "Hora exacta en Raleigh, Carolina del Norte, EE.UU."
  },
  {
    id: "philadelphia",
    name: "Filadelfia",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 39.9526,
    lng: -75.1652,
    population: 1603797,
    region: "Norteamérica",
    seoSlug: "hora-en-filadelfia",
    seoTitle: "Hora exacta en Filadelfia, Pensilvania, EE.UU."
  },
  {
    id: "pittsburgh",
    name: "Pittsburgh",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 40.4406,
    lng: -79.9959,
    population: 302971,
    region: "Norteamérica",
    seoSlug: "hora-en-pittsburgh",
    seoTitle: "Hora exacta en Pittsburgh, Pensilvania, EE.UU."
  },
  {
    id: "boston",
    name: "Boston",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 42.3601,
    lng: -71.0589,
    population: 675647,
    region: "Norteamérica",
    seoSlug: "hora-en-boston",
    seoTitle: "Hora exacta en Boston, Massachusetts, EE.UU."
  },
  {
    id: "baltimore",
    name: "Baltimore",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 39.2904,
    lng: -76.6122,
    population: 585708,
    region: "Norteamérica",
    seoSlug: "hora-en-baltimore",
    seoTitle: "Hora exacta en Baltimore, Maryland, EE.UU."
  },
  {
    id: "detroit",
    name: "Detroit",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Detroit",
    lat: 42.3314,
    lng: -83.0458,
    population: 639111,
    region: "Norteamérica",
    seoSlug: "hora-en-detroit",
    seoTitle: "Hora exacta en Detroit, Míchigan, EE.UU."
  },
  {
    id: "columbus",
    name: "Columbus",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 39.9612,
    lng: -82.9988,
    population: 905748,
    region: "Norteamérica",
    seoSlug: "hora-en-columbus",
    seoTitle: "Hora exacta en Columbus, Ohio, EE.UU."
  },
  {
    id: "cleveland",
    name: "Cleveland",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 41.4993,
    lng: -81.6944,
    population: 372624,
    region: "Norteamérica",
    seoSlug: "hora-en-cleveland",
    seoTitle: "Hora exacta en Cleveland, Ohio, EE.UU."
  },
  {
    id: "cincinnati",
    name: "Cincinnati",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 39.1031,
    lng: -84.5120,
    population: 309317,
    region: "Norteamérica",
    seoSlug: "hora-en-cincinnati",
    seoTitle: "Hora exacta en Cincinnati, Ohio, EE.UU."
  },
  {
    id: "indianapolis",
    name: "Indianápolis",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Indiana/Indianapolis",
    lat: 39.7684,
    lng: -86.1581,
    population: 887642,
    region: "Norteamérica",
    seoSlug: "hora-en-indianapolis",
    seoTitle: "Hora exacta en Indianápolis, Indiana, EE.UU."
  },
  {
    id: "louisville",
    name: "Louisville",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Kentucky/Louisville",
    lat: 38.2527,
    lng: -85.7585,
    population: 633045,
    region: "Norteamérica",
    seoSlug: "hora-en-louisville",
    seoTitle: "Hora exacta en Louisville, Kentucky, EE.UU."
  },
  {
    id: "richmond",
    name: "Richmond",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/New_York",
    lat: 37.5407,
    lng: -77.4360,
    population: 226610,
    region: "Norteamérica",
    seoSlug: "hora-en-richmond",
    seoTitle: "Hora exacta en Richmond, Virginia, EE.UU."
  },

  // --- Centro y Sur (Central Time Zone) ---
  {
    id: "chicago",
    name: "Chicago",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 41.8781,
    lng: -87.6298,
    population: 2746000,
    region: "Norteamérica",
    seoSlug: "hora-en-chicago",
    seoTitle: "Hora exacta en Chicago, Illinois, EE.UU."
  },
  {
    id: "houston",
    name: "Houston",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 29.7604,
    lng: -95.3698,
    population: 2304580,
    region: "Norteamérica",
    seoSlug: "hora-en-houston",
    seoTitle: "Hora exacta en Houston, Texas, EE.UU."
  },
  {
    id: "dallas",
    name: "Dallas",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 32.7767,
    lng: -96.7970,
    population: 1304379,
    region: "Norteamérica",
    seoSlug: "hora-en-dallas",
    seoTitle: "Hora exacta en Dallas, Texas, EE.UU."
  },
  {
    id: "austin",
    name: "Austin",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 30.2672,
    lng: -97.7431,
    population: 961855,
    region: "Norteamérica",
    seoSlug: "hora-en-austin",
    seoTitle: "Hora exacta en Austin, Texas, EE.UU."
  },
  {
    id: "san-antonio",
    name: "San Antonio",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 29.4241,
    lng: -98.4936,
    population: 1434625,
    region: "Norteamérica",
    seoSlug: "hora-en-san-antonio",
    seoTitle: "Hora exacta en San Antonio, Texas, EE.UU."
  },
  {
    id: "fort-worth",
    name: "Fort Worth",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 32.7555,
    lng: -97.3308,
    population: 918915,
    region: "Norteamérica",
    seoSlug: "hora-en-fort-worth",
    seoTitle: "Hora exacta en Fort Worth, Texas, EE.UU."
  },
  {
    id: "new-orleans",
    name: "Nueva Orleans",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 29.9511,
    lng: -90.0715,
    population: 383997,
    region: "Norteamérica",
    seoSlug: "hora-en-nueva-orleans",
    seoTitle: "Hora exacta en Nueva Orleans, Luisiana, EE.UU."
  },
  {
    id: "nashville",
    name: "Nashville",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 36.1627,
    lng: -86.7816,
    population: 689447,
    region: "Norteamérica",
    seoSlug: "hora-en-nashville",
    seoTitle: "Hora exacta en Nashville, Tennessee, EE.UU."
  },
  {
    id: "memphis",
    name: "Memphis",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 35.1495,
    lng: -90.0490,
    population: 633104,
    region: "Norteamérica",
    seoSlug: "hora-en-memphis",
    seoTitle: "Hora exacta en Memphis, Tennessee, EE.UU."
  },
  {
    id: "minneapolis",
    name: "Minneápolis",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 44.9778,
    lng: -93.2650,
    population: 429954,
    region: "Norteamérica",
    seoSlug: "hora-en-minneapolis",
    seoTitle: "Hora exacta en Minneápolis, Minnesota, EE.UU."
  },
  {
    id: "st-louis",
    name: "San Luis",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 38.6270,
    lng: -90.1994,
    population: 301574,
    region: "Norteamérica",
    seoSlug: "hora-en-san-luis-missouri",
    seoTitle: "Hora exacta en San Luis, Misuri, EE.UU."
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 39.0997,
    lng: -94.5786,
    population: 508090,
    region: "Norteamérica",
    seoSlug: "hora-en-kansas-city",
    seoTitle: "Hora exacta en Kansas City, Misuri, EE.UU."
  },
  {
    id: "milwaukee",
    name: "Milwaukee",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 43.0389,
    lng: -87.9065,
    population: 577222,
    region: "Norteamérica",
    seoSlug: "hora-en-milwaukee",
    seoTitle: "Hora exacta en Milwaukee, Wisconsin, EE.UU."
  },
  {
    id: "oklahoma-city",
    name: "Oklahoma City",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 35.4676,
    lng: -97.5164,
    population: 681054,
    region: "Norteamérica",
    seoSlug: "hora-en-oklahoma-city",
    seoTitle: "Hora exacta en Oklahoma City, Oklahoma, EE.UU."
  },
  {
    id: "omaha",
    name: "Omaha",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Chicago",
    lat: 41.2565,
    lng: -95.9345,
    population: 486051,
    region: "Norteamérica",
    seoSlug: "hora-en-omaha",
    seoTitle: "Hora exacta en Omaha, Nebraska, EE.UU."
  },

  // --- Montaña (Mountain Time Zone) ---
  {
    id: "denver",
    name: "Denver",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Denver",
    lat: 39.7392,
    lng: -104.9903,
    population: 715522,
    region: "Norteamérica",
    seoSlug: "hora-en-denver",
    seoTitle: "Hora exacta en Denver, Colorado, EE.UU."
  },
  {
    id: "phoenix",
    name: "Phoenix",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Phoenix",
    lat: 33.4484,
    lng: -112.0740,
    population: 1608139,
    region: "Norteamérica",
    seoSlug: "hora-en-phoenix",
    seoTitle: "Hora exacta en Phoenix, Arizona, EE.UU."
  },
  {
    id: "salt-lake-city",
    name: "Salt Lake City",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Denver",
    lat: 40.7608,
    lng: -111.8910,
    population: 199723,
    region: "Norteamérica",
    seoSlug: "hora-en-salt-lake-city",
    seoTitle: "Hora exacta en Salt Lake City, Utah, EE.UU."
  },
  {
    id: "albuquerque",
    name: "Albuquerque",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Denver",
    lat: 35.0844,
    lng: -106.6504,
    population: 564559,
    region: "Norteamérica",
    seoSlug: "hora-en-albuquerque",
    seoTitle: "Hora exacta en Albuquerque, Nuevo México, EE.UU."
  },
  {
    id: "el-paso",
    name: "El Paso",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Denver",
    lat: 31.7619,
    lng: -106.4850,
    population: 678815,
    region: "Norteamérica",
    seoSlug: "hora-en-el-paso",
    seoTitle: "Hora exacta en El Paso, Texas, EE.UU."
  },

  // --- Costa Oeste (Pacific Time Zone) ---
  {
    id: "los-angeles",
    name: "Los Ángeles",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 34.0522,
    lng: -118.2437,
    population: 3898000,
    region: "Norteamérica",
    seoSlug: "hora-en-los-angeles",
    seoTitle: "Hora exacta en Los Ángeles, California, EE.UU."
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 37.7749,
    lng: -122.4194,
    population: 873965,
    region: "Norteamérica",
    seoSlug: "hora-en-san-francisco",
    seoTitle: "Hora exacta en San Francisco, California, EE.UU."
  },
  {
    id: "san-diego",
    name: "San Diego",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 32.7157,
    lng: -117.1611,
    population: 1386932,
    region: "Norteamérica",
    seoSlug: "hora-en-san-diego",
    seoTitle: "Hora exacta en San Diego, California, EE.UU."
  },
  {
    id: "san-jose-ca",
    name: "San José (CA)",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 37.3382,
    lng: -121.8863,
    population: 1013240,
    region: "Norteamérica",
    seoSlug: "hora-en-san-jose-california",
    seoTitle: "Hora exacta en San José, California, EE.UU."
  },
  {
    id: "sacramento",
    name: "Sacramento",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 38.5816,
    lng: -121.4944,
    population: 524943,
    region: "Norteamérica",
    seoSlug: "hora-en-sacramento",
    seoTitle: "Hora exacta en Sacramento, California, EE.UU."
  },
  {
    id: "las-vegas",
    name: "Las Vegas",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 36.1699,
    lng: -115.1398,
    population: 641903,
    region: "Norteamérica",
    seoSlug: "hora-en-las-vegas",
    seoTitle: "Hora exacta en Las Vegas, Nevada, EE.UU."
  },
  {
    id: "seattle",
    name: "Seattle",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 47.6062,
    lng: -122.3321,
    population: 737015,
    region: "Norteamérica",
    seoSlug: "hora-en-seattle",
    seoTitle: "Hora exacta en Seattle, Washington, EE.UU."
  },
  {
    id: "portland",
    name: "Portland",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Los_Angeles",
    lat: 45.5152,
    lng: -122.6784,
    population: 652503,
    region: "Norteamérica",
    seoSlug: "hora-en-portland",
    seoTitle: "Hora exacta en Portland, Oregón, EE.UU."
  },

  // --- Alaska & Hawái ---
  {
    id: "anchorage",
    name: "Anchorage",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "America/Anchorage",
    lat: 61.2181,
    lng: -149.9003,
    population: 291247,
    region: "Norteamérica",
    seoSlug: "hora-en-anchorage",
    seoTitle: "Hora exacta en Anchorage, Alaska, EE.UU."
  },
  {
    id: "honolulu",
    name: "Honolulu",
    country: "Estados Unidos",
    countryCode: "US",
    timezone: "Pacific/Honolulu",
    lat: 21.3069,
    lng: -157.8583,
    population: 350964,
    region: "Norteamérica",
    seoSlug: "hora-en-honolulu",
    seoTitle: "Hora exacta en Honolulu, Hawái, EE.UU."
  },

  // ==========================================
  // 🌎 RESTO DEL MUNDO (CARIBE, LATAM, EUROPA, ASIA, ÁFRICA, OCEANÍA)
  // ==========================================
  {
    id: "santo-domingo",
    name: "Santo Domingo",
    country: "República Dominicana",
    countryCode: "DO",
    timezone: "America/Santo_Domingo",
    lat: 18.4861,
    lng: -69.9312,
    population: 2908607,
    region: "Caribe",
    seoSlug: "hora-en-santo-domingo",
    seoTitle: "Hora exacta en Santo Domingo, República Dominicana"
  },
  {
    id: "san-juan",
    name: "San Juan",
    country: "Puerto Rico",
    countryCode: "PR",
    timezone: "America/Puerto_Rico",
    lat: 18.4655,
    lng: -66.1057,
    population: 395326,
    region: "Caribe",
    seoSlug: "hora-en-san-juan",
    seoTitle: "Hora exacta en San Juan, Puerto Rico"
  },
  {
    id: "la-habana",
    name: "La Habana",
    country: "Cuba",
    countryCode: "CU",
    timezone: "America/Havana",
    lat: 23.1136,
    lng: -82.3666,
    population: 2130000,
    region: "Caribe",
    seoSlug: "hora-en-la-habana",
    seoTitle: "Hora exacta en La Habana, Cuba"
  },
  {
    id: "mexico-city",
    name: "Ciudad de México",
    country: "México",
    countryCode: "MX",
    timezone: "America/Mexico_City",
    lat: 19.4326,
    lng: -99.1332,
    population: 9209944,
    region: "Norteamérica",
    seoSlug: "hora-en-ciudad-de-mexico",
    seoTitle: "Hora exacta en Ciudad de México, México"
  },
  {
    id: "bogota",
    name: "Bogotá",
    country: "Colombia",
    countryCode: "CO",
    timezone: "America/Bogota",
    lat: 4.7110,
    lng: -74.0721,
    population: 7181000,
    region: "Sudamérica",
    seoSlug: "hora-en-bogota",
    seoTitle: "Hora exacta en Bogotá, Colombia"
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    timezone: "America/Argentina/Buenos_Aires",
    lat: -34.6037,
    lng: -58.3816,
    population: 3075000,
    region: "Sudamérica",
    seoSlug: "hora-en-buenos-aires",
    seoTitle: "Hora exacta en Buenos Aires, Argentina"
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    country: "Brasil",
    countryCode: "BR",
    timezone: "America/Sao_Paulo",
    lat: -23.5505,
    lng: -46.6333,
    population: 12330000,
    region: "Sudamérica",
    seoSlug: "hora-en-sao-paulo",
    seoTitle: "Hora exacta en São Paulo, Brasil"
  },
  {
    id: "santiago",
    name: "Santiago",
    country: "Chile",
    countryCode: "CL",
    timezone: "America/Santiago",
    lat: -33.4489,
    lng: -70.6693,
    population: 6250000,
    region: "Sudamérica",
    seoSlug: "hora-en-santiago",
    seoTitle: "Hora exacta en Santiago, Chile"
  },
  {
    id: "lima",
    name: "Lima",
    country: "Perú",
    countryCode: "PE",
    timezone: "America/Lima",
    lat: -12.0464,
    lng: -77.0428,
    population: 9750000,
    region: "Sudamérica",
    seoSlug: "hora-en-lima",
    seoTitle: "Hora exacta en Lima, Perú"
  },
  {
    id: "caracas",
    name: "Caracas",
    country: "Venezuela",
    countryCode: "VE",
    timezone: "America/Caracas",
    lat: 10.4806,
    lng: -66.9036,
    population: 2938000,
    region: "Sudamérica",
    seoSlug: "hora-en-caracas",
    seoTitle: "Hora exacta en Caracas, Venezuela"
  },
  {
    id: "quito",
    name: "Quito",
    country: "Ecuador",
    countryCode: "EC",
    timezone: "America/Guayaquil",
    lat: -0.1807,
    lng: -78.4678,
    population: 2011000,
    region: "Sudamérica",
    seoSlug: "hora-en-quito",
    seoTitle: "Hora exacta en Quito, Ecuador"
  },
  {
    id: "san-jose",
    name: "San José",
    country: "Costa Rica",
    countryCode: "CR",
    timezone: "America/Costa_Rica",
    lat: 9.9281,
    lng: -84.0907,
    population: 342188,
    region: "Centroamérica",
    seoSlug: "hora-en-san-jose-costa-rica",
    seoTitle: "Hora exacta en San José, Costa Rica"
  },
  {
    id: "panama",
    name: "Ciudad de Panamá",
    country: "Panamá",
    countryCode: "PA",
    timezone: "America/Panama",
    lat: 8.9824,
    lng: -79.5199,
    population: 880691,
    region: "Centroamérica",
    seoSlug: "hora-en-panama",
    seoTitle: "Hora exacta en Ciudad de Panamá, Panamá"
  },
  {
    id: "montevideo",
    name: "Montevideo",
    country: "Uruguay",
    countryCode: "UY",
    timezone: "America/Montevideo",
    lat: -34.9011,
    lng: -56.1645,
    population: 1381000,
    region: "Sudamérica",
    seoSlug: "hora-en-montevideo",
    seoTitle: "Hora exacta en Montevideo, Uruguay"
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "Canadá",
    countryCode: "CA",
    timezone: "America/Toronto",
    lat: 43.6532,
    lng: -79.3832,
    population: 2794000,
    region: "Norteamérica",
    seoSlug: "hora-en-toronto",
    seoTitle: "Hora exacta en Toronto, Canadá"
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canadá",
    countryCode: "CA",
    timezone: "America/Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    population: 675218,
    region: "Norteamérica",
    seoSlug: "hora-en-vancouver",
    seoTitle: "Hora exacta en Vancouver, Canadá"
  },

  // Europa
  {
    id: "madrid",
    name: "Madrid",
    country: "España",
    countryCode: "ES",
    timezone: "Europe/Madrid",
    lat: 40.4168,
    lng: -3.7038,
    population: 3223000,
    region: "Europa",
    seoSlug: "hora-en-madrid",
    seoTitle: "Hora exacta en Madrid, España"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "España",
    countryCode: "ES",
    timezone: "Europe/Madrid",
    lat: 41.3851,
    lng: 2.1734,
    population: 1620000,
    region: "Europa",
    seoSlug: "hora-en-barcelona",
    seoTitle: "Hora exacta en Barcelona, España"
  },
  {
    id: "london",
    name: "Londres",
    country: "Reino Unido",
    countryCode: "GB",
    timezone: "Europe/London",
    lat: 51.5074,
    lng: -0.1278,
    population: 8982000,
    region: "Europa",
    seoSlug: "hora-en-londres",
    seoTitle: "Hora exacta en Londres, Reino Unido"
  },
  {
    id: "paris",
    name: "París",
    country: "Francia",
    countryCode: "FR",
    timezone: "Europe/Paris",
    lat: 48.8566,
    lng: 2.3522,
    population: 2161000,
    region: "Europa",
    seoSlug: "hora-en-paris",
    seoTitle: "Hora exacta en París, Francia"
  },
  {
    id: "berlin",
    name: "Berlín",
    country: "Alemania",
    countryCode: "DE",
    timezone: "Europe/Berlin",
    lat: 52.5200,
    lng: 13.4050,
    population: 3645000,
    region: "Europa",
    seoSlug: "hora-en-berlin",
    seoTitle: "Hora exacta en Berlín, Alemania"
  },
  {
    id: "rome",
    name: "Roma",
    country: "Italia",
    countryCode: "IT",
    timezone: "Europe/Rome",
    lat: 41.9028,
    lng: 12.4964,
    population: 2873000,
    region: "Europa",
    seoSlug: "hora-en-roma",
    seoTitle: "Hora exacta en Roma, Italia"
  },
  {
    id: "amsterdam",
    name: "Ámsterdam",
    country: "Países Bajos",
    countryCode: "NL",
    timezone: "Europe/Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    population: 872680,
    region: "Europa",
    seoSlug: "hora-en-amsterdam",
    seoTitle: "Hora exacta en Ámsterdam, Países Bajos"
  },
  {
    id: "lisbon",
    name: "Lisboa",
    country: "Portugal",
    countryCode: "PT",
    timezone: "Europe/Lisbon",
    lat: 38.7223,
    lng: -9.1393,
    population: 504718,
    region: "Europa",
    seoSlug: "hora-en-lisboa",
    seoTitle: "Hora exacta en Lisboa, Portugal"
  },
  {
    id: "brussels",
    name: "Bruselas",
    country: "Bélgica",
    countryCode: "BE",
    timezone: "Europe/Brussels",
    lat: 50.8503,
    lng: 4.3517,
    population: 1209000,
    region: "Europa",
    seoSlug: "hora-en-bruselas",
    seoTitle: "Hora exacta en Bruselas, Bélgica"
  },
  {
    id: "vienna",
    name: "Viena",
    country: "Austria",
    countryCode: "AT",
    timezone: "Europe/Vienna",
    lat: 48.2082,
    lng: 16.3738,
    population: 1897000,
    region: "Europa",
    seoSlug: "hora-en-viena",
    seoTitle: "Hora exacta en Viena, Austria"
  },
  {
    id: "athens",
    name: "Atenas",
    country: "Grecia",
    countryCode: "GR",
    timezone: "Europe/Athens",
    lat: 37.9838,
    lng: 23.7275,
    population: 664046,
    region: "Europa",
    seoSlug: "hora-en-atenas",
    seoTitle: "Hora exacta en Atenas, Grecia"
  },
  {
    id: "zurich",
    name: "Zúrich",
    country: "Suiza",
    countryCode: "CH",
    timezone: "Europe/Zurich",
    lat: 47.3769,
    lng: 8.5417,
    population: 402762,
    region: "Europa",
    seoSlug: "hora-en-zurich",
    seoTitle: "Hora exacta en Zúrich, Suiza"
  },
  {
    id: "moscow",
    name: "Moscú",
    country: "Rusia",
    countryCode: "RU",
    timezone: "Europe/Moscow",
    lat: 55.7558,
    lng: 37.6173,
    population: 12650000,
    region: "Europa",
    seoSlug: "hora-en-moscu",
    seoTitle: "Hora exacta en Moscú, Rusia"
  },

  // Asia, África & Oceanía
  {
    id: "tokyo",
    name: "Tokio",
    country: "Japón",
    countryCode: "JP",
    timezone: "Asia/Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    population: 13960000,
    region: "Asia",
    seoSlug: "hora-en-tokio",
    seoTitle: "Hora exacta en Tokio, Japón"
  },
  {
    id: "seoul",
    name: "Seúl",
    country: "Corea del Sur",
    countryCode: "KR",
    timezone: "Asia/Seoul",
    lat: 37.5665,
    lng: 126.9780,
    population: 9776000,
    region: "Asia",
    seoSlug: "hora-en-seul",
    seoTitle: "Hora exacta en Seúl, Corea del Sur"
  },
  {
    id: "beijing",
    name: "Pekín",
    country: "China",
    countryCode: "CN",
    timezone: "Asia/Shanghai",
    lat: 39.9042,
    lng: 116.4074,
    population: 21540000,
    region: "Asia",
    seoSlug: "hora-en-pekin",
    seoTitle: "Hora exacta en Pekín, China"
  },
  {
    id: "hong-kong",
    name: "Hong Kong",
    country: "China",
    countryCode: "HK",
    timezone: "Asia/Hong_Kong",
    lat: 22.3193,
    lng: 114.1694,
    population: 7500000,
    region: "Asia",
    seoSlug: "hora-en-hong-kong",
    seoTitle: "Hora exacta en Hong Kong, China"
  },
  {
    id: "singapore",
    name: "Singapur",
    country: "Singapur",
    countryCode: "SG",
    timezone: "Asia/Singapore",
    lat: 1.3521,
    lng: 103.8198,
    population: 5686000,
    region: "Asia",
    seoSlug: "hora-en-singapur",
    seoTitle: "Hora exacta en Singapur"
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Tailandia",
    countryCode: "TH",
    timezone: "Asia/Bangkok",
    lat: 13.7563,
    lng: 100.5018,
    population: 10539000,
    region: "Asia",
    seoSlug: "hora-en-bangkok",
    seoTitle: "Hora exacta en Bangkok, Tailandia"
  },
  {
    id: "new-delhi",
    name: "Nueva Delhi",
    country: "India",
    countryCode: "IN",
    timezone: "Asia/Kolkata",
    lat: 28.6139,
    lng: 77.2090,
    population: 32941000,
    region: "Asia",
    seoSlug: "hora-en-nueva-delhi",
    seoTitle: "Hora exacta en Nueva Delhi, India"
  },
  {
    id: "dubai",
    name: "Dubái",
    country: "Emiratos Árabes Unidos",
    countryCode: "AE",
    timezone: "Asia/Dubai",
    lat: 25.2048,
    lng: 55.2708,
    population: 3331000,
    region: "Medio Oriente",
    seoSlug: "hora-en-dubai",
    seoTitle: "Hora exacta en Dubái, Emiratos Árabes Unidos"
  },
  {
    id: "istanbul",
    name: "Estambul",
    country: "Turquía",
    countryCode: "TR",
    timezone: "Europe/Istanbul",
    lat: 41.0082,
    lng: 28.9784,
    population: 15460000,
    region: "Medio Oriente",
    seoSlug: "hora-en-estambul",
    seoTitle: "Hora exacta en Estambul, Turquía"
  },
  {
    id: "cairo",
    name: "El Cairo",
    country: "Egipto",
    countryCode: "EG",
    timezone: "Africa/Cairo",
    lat: 30.0444,
    lng: 31.2357,
    population: 9500000,
    region: "África",
    seoSlug: "hora-en-el-cairo",
    seoTitle: "Hora exacta en El Cairo, Egipto"
  },
  {
    id: "johannesburg",
    name: "Johannesburgo",
    country: "Sudáfrica",
    countryCode: "ZA",
    timezone: "Africa/Johannesburg",
    lat: -26.2041,
    lng: 28.0473,
    population: 5635000,
    region: "África",
    seoSlug: "hora-en-johannesburgo",
    seoTitle: "Hora exacta en Johannesburgo, Sudáfrica"
  },
  {
    id: "sydney",
    name: "Sídney",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Sydney",
    lat: -33.8688,
    lng: 151.2093,
    population: 5312000,
    region: "Oceanía",
    seoSlug: "hora-en-sydney",
    seoTitle: "Hora exacta en Sídney, Australia"
  },
  {
    id: "melbourne",
    name: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Melbourne",
    lat: -37.8136,
    lng: 144.9631,
    population: 5078000,
    region: "Oceanía",
    seoSlug: "hora-en-melbourne",
    seoTitle: "Hora exacta en Melbourne, Australia"
  },
  {
    id: "auckland",
    name: "Auckland",
    country: "Nueva Zelanda",
    countryCode: "NZ",
    timezone: "Pacific/Auckland",
    lat: -36.8485,
    lng: 174.7633,
    population: 1657000,
    region: "Oceanía",
    seoSlug: "hora-en-auckland",
    seoTitle: "Hora exacta en Auckland, Nueva Zelanda"
  },

  // ==========================================
  // 🌍 EXPANSIÓN GLOBAL (50 NUEVAS METRÓPOLIS ESTRATÉGICAS)
  // ==========================================

  // --- Europa Nórdica, Británica y del Este ---
  {
    id: "stockholm",
    name: "Estocolmo",
    country: "Suecia",
    countryCode: "SE",
    timezone: "Europe/Stockholm",
    lat: 59.3293,
    lng: 18.0686,
    population: 975551,
    region: "Europa",
    seoSlug: "hora-en-estocolmo",
    seoTitle: "Hora exacta en Estocolmo, Suecia"
  },
  {
    id: "oslo",
    name: "Oslo",
    country: "Noruega",
    countryCode: "NO",
    timezone: "Europe/Oslo",
    lat: 59.9139,
    lng: 10.7522,
    population: 697010,
    region: "Europa",
    seoSlug: "hora-en-oslo",
    seoTitle: "Hora exacta en Oslo, Noruega"
  },
  {
    id: "copenhagen",
    name: "Copenhague",
    country: "Dinamarca",
    countryCode: "DK",
    timezone: "Europe/Copenhagen",
    lat: 55.6761,
    lng: 12.5683,
    population: 638117,
    region: "Europa",
    seoSlug: "hora-en-copenhague",
    seoTitle: "Hora exacta en Copenhague, Dinamarca"
  },
  {
    id: "helsinki",
    name: "Helsinki",
    country: "Finlandia",
    countryCode: "FI",
    timezone: "Europe/Helsinki",
    lat: 60.1699,
    lng: 24.9384,
    population: 658864,
    region: "Europa",
    seoSlug: "hora-en-helsinki",
    seoTitle: "Hora exacta en Helsinki, Finlandia"
  },
  {
    id: "reykjavik",
    name: "Reikiavik",
    country: "Islandia",
    countryCode: "IS",
    timezone: "Atlantic/Reykjavik",
    lat: 64.1466,
    lng: -21.9426,
    population: 131136,
    region: "Europa",
    seoSlug: "hora-en-reikiavik",
    seoTitle: "Hora exacta en Reikiavik, Islandia"
  },
  {
    id: "dublin",
    name: "Dublín",
    country: "Irlanda",
    countryCode: "IE",
    timezone: "Europe/Dublin",
    lat: 53.3498,
    lng: -6.2603,
    population: 544107,
    region: "Europa",
    seoSlug: "hora-en-dublin",
    seoTitle: "Hora exacta en Dublín, Irlanda"
  },
  {
    id: "warsaw",
    name: "Varsovia",
    country: "Polonia",
    countryCode: "PL",
    timezone: "Europe/Warsaw",
    lat: 52.2297,
    lng: 21.0122,
    population: 1790658,
    region: "Europa",
    seoSlug: "hora-en-varsovia",
    seoTitle: "Hora exacta en Varsovia, Polonia"
  },
  {
    id: "prague",
    name: "Praga",
    country: "República Checa",
    countryCode: "CZ",
    timezone: "Europe/Prague",
    lat: 50.0755,
    lng: 14.4378,
    population: 1309000,
    region: "Europa",
    seoSlug: "hora-en-praga",
    seoTitle: "Hora exacta en Praga, República Checa"
  },
  {
    id: "budapest",
    name: "Budapest",
    country: "Hungría",
    countryCode: "HU",
    timezone: "Europe/Budapest",
    lat: 47.4979,
    lng: 19.0402,
    population: 1752286,
    region: "Europa",
    seoSlug: "hora-en-budapest",
    seoTitle: "Hora exacta en Budapest, Hungría"
  },
  {
    id: "bucharest",
    name: "Bucarest",
    country: "Rumanía",
    countryCode: "RO",
    timezone: "Europe/Bucharest",
    lat: 44.4268,
    lng: 26.1025,
    population: 1883425,
    region: "Europa",
    seoSlug: "hora-en-bucarest",
    seoTitle: "Hora exacta en Bucarest, Rumanía"
  },
  {
    id: "kyiv",
    name: "Kiev",
    country: "Ucrania",
    countryCode: "UA",
    timezone: "Europe/Kyiv",
    lat: 50.4501,
    lng: 30.5234,
    population: 2962180,
    region: "Europa",
    seoSlug: "hora-en-kiev",
    seoTitle: "Hora exacta en Kiev, Ucrania"
  },
  {
    id: "belgrade",
    name: "Belgrado",
    country: "Serbia",
    countryCode: "RS",
    timezone: "Europe/Belgrade",
    lat: 44.7866,
    lng: 20.4489,
    population: 1374000,
    region: "Europa",
    seoSlug: "hora-en-belgrado",
    seoTitle: "Hora exacta en Belgrado, Serbia"
  },

  // --- Asia del Sur, Sudeste y Central ---
  {
    id: "jakarta",
    name: "Yakarta",
    country: "Indonesia",
    countryCode: "ID",
    timezone: "Asia/Jakarta",
    lat: -6.2088,
    lng: 106.8456,
    population: 10562088,
    region: "Asia",
    seoSlug: "hora-en-yakarta",
    seoTitle: "Hora exacta en Yakarta, Indonesia"
  },
  {
    id: "manila",
    name: "Manila",
    country: "Filipinas",
    countryCode: "PH",
    timezone: "Asia/Manila",
    lat: 14.5995,
    lng: 120.9842,
    population: 1846513,
    region: "Asia",
    seoSlug: "hora-en-manila",
    seoTitle: "Hora exacta en Manila, Filipinas"
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    country: "Malasia",
    countryCode: "MY",
    timezone: "Asia/Kuala_Lumpur",
    lat: 3.1390,
    lng: 101.6869,
    population: 1982112,
    region: "Asia",
    seoSlug: "hora-en-kuala-lumpur",
    seoTitle: "Hora exacta en Kuala Lumpur, Malasia"
  },
  {
    id: "hanoi",
    name: "Hanói",
    country: "Vietnam",
    countryCode: "VN",
    timezone: "Asia/Bangkok",
    lat: 21.0285,
    lng: 105.8542,
    population: 8053663,
    region: "Asia",
    seoSlug: "hora-en-hanoi",
    seoTitle: "Hora exacta en Hanói, Vietnam"
  },
  {
    id: "ho-chi-minh",
    name: "Ciudad Ho Chi Minh",
    country: "Vietnam",
    countryCode: "VN",
    timezone: "Asia/Bangkok",
    lat: 10.8231,
    lng: 106.6297,
    population: 8993082,
    region: "Asia",
    seoSlug: "hora-en-ciudad-ho-chi-minh",
    seoTitle: "Hora exacta en Ciudad Ho Chi Minh, Vietnam"
  },
  {
    id: "taipei",
    name: "Taipéi",
    country: "Taiwán",
    countryCode: "TW",
    timezone: "Asia/Taipei",
    lat: 25.0330,
    lng: 121.5654,
    population: 2602418,
    region: "Asia",
    seoSlug: "hora-en-taipei",
    seoTitle: "Hora exacta en Taipéi, Taiwán"
  },
  {
    id: "kathmandu",
    name: "Katmandú",
    country: "Nepal",
    countryCode: "NP",
    timezone: "Asia/Kathmandu",
    lat: 27.7172,
    lng: 85.3240,
    population: 1442000,
    region: "Asia",
    seoSlug: "hora-en-katmandu",
    seoTitle: "Hora exacta en Katmandú, Nepal"
  },
  {
    id: "dhaka",
    name: "Daca",
    country: "Bangladés",
    countryCode: "BD",
    timezone: "Asia/Dhaka",
    lat: 23.8103,
    lng: 90.4125,
    population: 10295407,
    region: "Asia",
    seoSlug: "hora-en-daca",
    seoTitle: "Hora exacta en Daca, Bangladés"
  },
  {
    id: "karachi",
    name: "Karachi",
    country: "Pakistán",
    countryCode: "PK",
    timezone: "Asia/Karachi",
    lat: 24.8607,
    lng: 67.0011,
    population: 14910352,
    region: "Asia",
    seoSlug: "hora-en-karachi",
    seoTitle: "Hora exacta en Karachi, Pakistán"
  },
  {
    id: "islamabad",
    name: "Islamabad",
    country: "Pakistán",
    countryCode: "PK",
    timezone: "Asia/Karachi",
    lat: 33.6844,
    lng: 73.0479,
    population: 1014825,
    region: "Asia",
    seoSlug: "hora-en-islamabad",
    seoTitle: "Hora exacta en Islamabad, Pakistán"
  },
  {
    id: "colombo",
    name: "Colombo",
    country: "Sri Lanka",
    countryCode: "LK",
    timezone: "Asia/Colombo",
    lat: 6.9271,
    lng: 79.8612,
    population: 752993,
    region: "Asia",
    seoSlug: "hora-en-colombo",
    seoTitle: "Hora exacta en Colombo, Sri Lanka"
  },
  {
    id: "almaty",
    name: "Almaty",
    country: "Kazajistán",
    countryCode: "KZ",
    timezone: "Asia/Almaty",
    lat: 43.2220,
    lng: 76.8512,
    population: 2000900,
    region: "Asia",
    seoSlug: "hora-en-almaty",
    seoTitle: "Hora exacta en Almaty, Kazajistán"
  },
  {
    id: "ulaanbaatar",
    name: "Ulán Bator",
    country: "Mongolia",
    countryCode: "MN",
    timezone: "Asia/Ulaanbaatar",
    lat: 47.8864,
    lng: 106.9057,
    population: 1452000,
    region: "Asia",
    seoSlug: "hora-en-ulan-bator",
    seoTitle: "Hora exacta en Ulán Bator, Mongolia"
  },

  // --- Medio Oriente ---
  {
    id: "riyadh",
    name: "Riad",
    country: "Arabia Saudita",
    countryCode: "SA",
    timezone: "Asia/Riyadh",
    lat: 24.7136,
    lng: 46.6753,
    population: 7676654,
    region: "Medio Oriente",
    seoSlug: "hora-en-riad",
    seoTitle: "Hora exacta en Riad, Arabia Saudita"
  },
  {
    id: "jeddah",
    name: "Yeda",
    country: "Arabia Saudita",
    countryCode: "SA",
    timezone: "Asia/Riyadh",
    lat: 21.4858,
    lng: 39.1925,
    population: 4697000,
    region: "Medio Oriente",
    seoSlug: "hora-en-yeda",
    seoTitle: "Hora exacta en Yeda, Arabia Saudita"
  },
  {
    id: "tehran",
    name: "Teherán",
    country: "Irán",
    countryCode: "IR",
    timezone: "Asia/Tehran",
    lat: 35.6892,
    lng: 51.3890,
    population: 8693706,
    region: "Medio Oriente",
    seoSlug: "hora-en-teheran",
    seoTitle: "Hora exacta en Teherán, Irán"
  },
  {
    id: "doha",
    name: "Doha",
    country: "Catar",
    countryCode: "QA",
    timezone: "Asia/Qatar",
    lat: 25.2854,
    lng: 51.5310,
    population: 1186023,
    region: "Medio Oriente",
    seoSlug: "hora-en-doha",
    seoTitle: "Hora exacta en Doha, Catar"
  },
  {
    id: "tel-aviv",
    name: "Tel Aviv",
    country: "Israel",
    countryCode: "IL",
    timezone: "Asia/Jerusalem",
    lat: 32.0853,
    lng: 34.7818,
    population: 460613,
    region: "Medio Oriente",
    seoSlug: "hora-en-tel-aviv",
    seoTitle: "Hora exacta en Tel Aviv, Israel"
  },
  {
    id: "kuwait-city",
    name: "Ciudad de Kuwait",
    country: "Kuwait",
    countryCode: "KW",
    timezone: "Asia/Kuwait",
    lat: 29.3759,
    lng: 47.9774,
    population: 2989000,
    region: "Medio Oriente",
    seoSlug: "hora-en-ciudad-de-kuwait",
    seoTitle: "Hora exacta en Ciudad de Kuwait, Kuwait"
  },

  // --- África ---
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    countryCode: "NG",
    timezone: "Africa/Lagos",
    lat: 6.5244,
    lng: 3.3792,
    population: 15388000,
    region: "África",
    seoSlug: "hora-en-lagos",
    seoTitle: "Hora exacta en Lagos, Nigeria"
  },
  {
    id: "nairobi",
    name: "Nairobi",
    country: "Kenia",
    countryCode: "KE",
    timezone: "Africa/Nairobi",
    lat: -1.2921,
    lng: 36.8219,
    population: 4397073,
    region: "África",
    seoSlug: "hora-en-nairobi",
    seoTitle: "Hora exacta en Nairobi, Kenia"
  },
  {
    id: "casablanca",
    name: "Casablanca",
    country: "Marruecos",
    countryCode: "MA",
    timezone: "Africa/Casablanca",
    lat: 33.5731,
    lng: -7.5898,
    population: 3359818,
    region: "África",
    seoSlug: "hora-en-casablanca",
    seoTitle: "Hora exacta en Casablanca, Marruecos"
  },
  {
    id: "addis-ababa",
    name: "Adís Abeba",
    country: "Etiopía",
    countryCode: "ET",
    timezone: "Africa/Addis_Ababa",
    lat: 9.0320,
    lng: 38.7469,
    population: 3040740,
    region: "África",
    seoSlug: "hora-en-adis-abeba",
    seoTitle: "Hora exacta en Adís Abeba, Etiopía"
  },
  {
    id: "accra",
    name: "Acra",
    country: "Ghana",
    countryCode: "GH",
    timezone: "Africa/Accra",
    lat: 5.6037,
    lng: -0.1870,
    population: 2291352,
    region: "África",
    seoSlug: "hora-en-acra",
    seoTitle: "Hora exacta en Acra, Ghana"
  },
  {
    id: "dakar",
    name: "Dakar",
    country: "Senegal",
    countryCode: "SN",
    timezone: "Africa/Dakar",
    lat: 14.7167,
    lng: -17.4677,
    population: 1146053,
    region: "África",
    seoSlug: "hora-en-dakar",
    seoTitle: "Hora exacta en Dakar, Senegal"
  },
  {
    id: "algiers",
    name: "Argel",
    country: "Argelia",
    countryCode: "DZ",
    timezone: "Africa/Algiers",
    lat: 36.7538,
    lng: 3.0588,
    population: 3415811,
    region: "África",
    seoSlug: "hora-en-argel",
    seoTitle: "Hora exacta en Argel, Argelia"
  },
  {
    id: "luanda",
    name: "Luanda",
    country: "Angola",
    countryCode: "AO",
    timezone: "Africa/Luanda",
    lat: -8.8390,
    lng: 13.2894,
    population: 2571861,
    region: "África",
    seoSlug: "hora-en-luanda",
    seoTitle: "Hora exacta en Luanda, Angola"
  },
  {
    id: "cape-town",
    name: "Ciudad del Cabo",
    country: "Sudáfrica",
    countryCode: "ZA",
    timezone: "Africa/Johannesburg",
    lat: -33.9249,
    lng: 18.4241,
    population: 4618000,
    region: "África",
    seoSlug: "hora-en-ciudad-del-cabo",
    seoTitle: "Hora exacta en Ciudad del Cabo, Sudáfrica"
  },

  // --- Latinoamérica y Caribe ---
  {
    id: "la-paz",
    name: "La Paz",
    country: "Bolivia",
    countryCode: "BO",
    timezone: "America/La_Paz",
    lat: -16.4897,
    lng: -68.1193,
    population: 816044,
    region: "Sudamérica",
    seoSlug: "hora-en-la-paz",
    seoTitle: "Hora exacta en La Paz, Bolivia"
  },
  {
    id: "asuncion",
    name: "Asunción",
    country: "Paraguay",
    countryCode: "PY",
    timezone: "America/Asuncion",
    lat: -25.2637,
    lng: -57.5759,
    population: 521559,
    region: "Sudamérica",
    seoSlug: "hora-en-asuncion",
    seoTitle: "Hora exacta en Asunción, Paraguay"
  },
  {
    id: "guatemala-city",
    name: "Ciudad de Guatemala",
    country: "Guatemala",
    countryCode: "GT",
    timezone: "America/Guatemala",
    lat: 14.6349,
    lng: -90.5069,
    population: 994078,
    region: "Centroamérica",
    seoSlug: "hora-en-ciudad-de-guatemala",
    seoTitle: "Hora exacta en Ciudad de Guatemala, Guatemala"
  },
  {
    id: "san-salvador",
    name: "San Salvador",
    country: "El Salvador",
    countryCode: "SV",
    timezone: "America/El_Salvador",
    lat: 13.6929,
    lng: -89.2182,
    population: 316090,
    region: "Centroamérica",
    seoSlug: "hora-en-san-salvador",
    seoTitle: "Hora exacta en San Salvador, El Salvador"
  },
  {
    id: "tegucigalpa",
    name: "Tegucigalpa",
    country: "Honduras",
    countryCode: "HN",
    timezone: "America/Tegucigalpa",
    lat: 14.0723,
    lng: -87.1921,
    population: 1157509,
    region: "Centroamérica",
    seoSlug: "hora-en-tegucigalpa",
    seoTitle: "Hora exacta en Tegucigalpa, Honduras"
  },
  {
    id: "kingston",
    name: "Kingston",
    country: "Jamaica",
    countryCode: "JM",
    timezone: "America/Jamaica",
    lat: 17.9714,
    lng: -76.7936,
    population: 670000,
    region: "Caribe",
    seoSlug: "hora-en-kingston",
    seoTitle: "Hora exacta en Kingston, Jamaica"
  },

  // --- Países y Husos Horarios Adicionales de América ---
  // Centroamérica
  {
    id: "managua",
    name: "Managua",
    country: "Nicaragua",
    countryCode: "NI",
    timezone: "America/Managua",
    lat: 12.1364,
    lng: -86.2514,
    population: 1050000,
    region: "Centroamérica",
    seoSlug: "hora-en-managua",
    seoTitle: "Hora exacta en Managua, Nicaragua"
  },
  {
    id: "ciudad-de-belice",
    name: "Ciudad de Belice",
    country: "Belice",
    countryCode: "BZ",
    timezone: "America/Belize",
    lat: 17.5046,
    lng: -88.1962,
    population: 68000,
    region: "Centroamérica",
    seoSlug: "hora-en-ciudad-de-belice",
    seoTitle: "Hora exacta en Ciudad de Belice, Belice"
  },

  // Sudamérica
  {
    id: "georgetown",
    name: "Georgetown",
    country: "Guyana",
    countryCode: "GY",
    timezone: "America/Guyana",
    lat: 6.8013,
    lng: -58.1551,
    population: 200000,
    region: "Sudamérica",
    seoSlug: "hora-en-georgetown",
    seoTitle: "Hora exacta en Georgetown, Guyana"
  },
  {
    id: "paramaribo",
    name: "Paramaribo",
    country: "Surinam",
    countryCode: "SR",
    timezone: "America/Paramaribo",
    lat: 5.8520,
    lng: -55.2038,
    population: 240000,
    region: "Sudamérica",
    seoSlug: "hora-en-paramaribo",
    seoTitle: "Hora exacta en Paramaribo, Surinam"
  },
  {
    id: "cayena",
    name: "Cayena",
    country: "Guayana Francesa",
    countryCode: "GF",
    timezone: "America/Cayenne",
    lat: 4.9372,
    lng: -52.3260,
    population: 65000,
    region: "Sudamérica",
    seoSlug: "hora-en-cayena",
    seoTitle: "Hora exacta en Cayena, Guayana Francesa"
  },
  {
    id: "manaus",
    name: "Manaos",
    country: "Brasil",
    countryCode: "BR",
    timezone: "America/Manaus",
    lat: -3.1190,
    lng: -60.0217,
    population: 2200000,
    region: "Sudamérica",
    seoSlug: "hora-en-manaos",
    seoTitle: "Hora exacta en Manaos, Brasil"
  },
  {
    id: "fernando-de-noronha",
    name: "Fernando de Noronha",
    country: "Brasil",
    countryCode: "BR",
    timezone: "America/Noronha",
    lat: -3.8547,
    lng: -32.4297,
    population: 3100,
    region: "Sudamérica",
    seoSlug: "hora-en-fernando-de-noronha",
    seoTitle: "Hora exacta en Fernando de Noronha, Brasil"
  },
  {
    id: "isla-de-pascua",
    name: "Isla de Pascua",
    country: "Chile",
    countryCode: "CL",
    timezone: "Pacific/Easter",
    lat: -27.1127,
    lng: -109.3497,
    population: 7750,
    region: "Sudamérica",
    seoSlug: "hora-en-isla-de-pascua",
    seoTitle: "Hora exacta en Isla de Pascua, Chile"
  },
  {
    id: "islas-galapagos",
    name: "Islas Galápagos",
    country: "Ecuador",
    countryCode: "EC",
    timezone: "Pacific/Galapagos",
    lat: -0.7432,
    lng: -90.3138,
    population: 33000,
    region: "Sudamérica",
    seoSlug: "hora-en-islas-galapagos",
    seoTitle: "Hora exacta en Islas Galápagos, Ecuador"
  },

  // El Caribe
  {
    id: "puerto-principe",
    name: "Puerto Príncipe",
    country: "Haití",
    countryCode: "HT",
    timezone: "America/Port-au-Prince",
    lat: 18.5944,
    lng: -72.3074,
    population: 2900000,
    region: "Caribe",
    seoSlug: "hora-en-puerto-principe",
    seoTitle: "Hora exacta en Puerto Príncipe, Haití"
  },
  {
    id: "nasau",
    name: "Nasáu",
    country: "Bahamas",
    countryCode: "BS",
    timezone: "America/Nassau",
    lat: 25.0443,
    lng: -77.3504,
    population: 275000,
    region: "Caribe",
    seoSlug: "hora-en-nasau",
    seoTitle: "Hora exacta en Nasáu, Bahamas"
  },
  {
    id: "puerto-espana",
    name: "Puerto España",
    country: "Trinidad y Tobago",
    countryCode: "TT",
    timezone: "America/Port_of_Spain",
    lat: 10.6549,
    lng: -61.5019,
    population: 37000,
    region: "Caribe",
    seoSlug: "hora-en-puerto-espana",
    seoTitle: "Hora exacta en Puerto España, Trinidad y Tobago"
  },
  {
    id: "bridgetown",
    name: "Bridgetown",
    country: "Barbados",
    countryCode: "BB",
    timezone: "America/Barbados",
    lat: 13.1060,
    lng: -59.6132,
    population: 110000,
    region: "Caribe",
    seoSlug: "hora-en-bridgetown",
    seoTitle: "Hora exacta en Bridgetown, Barbados"
  },
  {
    id: "willemstad",
    name: "Willemstad",
    country: "Curazao",
    countryCode: "CW",
    timezone: "America/Curacao",
    lat: 12.1224,
    lng: -68.9335,
    population: 150000,
    region: "Caribe",
    seoSlug: "hora-en-willemstad",
    seoTitle: "Hora exacta en Willemstad, Curazao"
  },
  {
    id: "oranjestad",
    name: "Oranjestad",
    country: "Aruba",
    countryCode: "AW",
    timezone: "America/Aruba",
    lat: 12.5092,
    lng: -70.0086,
    population: 35000,
    region: "Caribe",
    seoSlug: "hora-en-oranjestad",
    seoTitle: "Hora exacta en Oranjestad, Aruba"
  },
  {
    id: "castries",
    name: "Castries",
    country: "Santa Lucía",
    countryCode: "LC",
    timezone: "America/St_Lucia",
    lat: 14.0101,
    lng: -60.9875,
    population: 70000,
    region: "Caribe",
    seoSlug: "hora-en-castries",
    seoTitle: "Hora exacta en Castries, Santa Lucía"
  },
  {
    id: "saint-john",
    name: "Saint John",
    country: "Antigua y Barbuda",
    countryCode: "AG",
    timezone: "America/Antigua",
    lat: 17.1274,
    lng: -61.8468,
    population: 22000,
    region: "Caribe",
    seoSlug: "hora-en-saint-john",
    seoTitle: "Hora exacta en Saint John, Antigua y Barbuda"
  },
  {
    id: "saint-george",
    name: "Saint George",
    country: "Granada",
    countryCode: "GD",
    timezone: "America/Grenada",
    lat: 12.0561,
    lng: -61.7488,
    population: 35000,
    region: "Caribe",
    seoSlug: "hora-en-saint-george",
    seoTitle: "Hora exacta en Saint George, Granada"
  },
  {
    id: "kingstown",
    name: "Kingstown",
    country: "San Vicente y las Granadinas",
    countryCode: "VC",
    timezone: "America/St_Vincent",
    lat: 13.1600,
    lng: -61.2248,
    population: 25000,
    region: "Caribe",
    seoSlug: "hora-en-kingstown",
    seoTitle: "Hora exacta en Kingstown, San Vicente y las Granadinas"
  },
  {
    id: "roseau",
    name: "Roseau",
    country: "Dominica",
    countryCode: "DM",
    timezone: "America/Dominica",
    lat: 15.3092,
    lng: -61.3794,
    population: 15000,
    region: "Caribe",
    seoSlug: "hora-en-roseau",
    seoTitle: "Hora exacta en Roseau, Dominica"
  },
  {
    id: "basseterre",
    name: "Basseterre",
    country: "San Cristóbal y Nieves",
    countryCode: "KN",
    timezone: "America/St_Kitts",
    lat: 17.3026,
    lng: -62.7177,
    population: 14000,
    region: "Caribe",
    seoSlug: "hora-en-basseterre",
    seoTitle: "Hora exacta en Basseterre, San Cristóbal y Nieves"
  },
  {
    id: "george-town-caiman",
    name: "George Town",
    country: "Islas Caimán",
    countryCode: "KY",
    timezone: "America/Cayman",
    lat: 19.2869,
    lng: -81.3674,
    population: 35000,
    region: "Caribe",
    seoSlug: "hora-en-george-town-caiman",
    seoTitle: "Hora exacta en George Town, Islas Caimán"
  },
  {
    id: "hamilton-bermudas",
    name: "Hamilton",
    country: "Bermudas",
    countryCode: "BM",
    timezone: "Atlantic/Bermuda",
    lat: 32.2948,
    lng: -64.7814,
    population: 10000,
    region: "Caribe",
    seoSlug: "hora-en-hamilton-bermudas",
    seoTitle: "Hora exacta en Hamilton, Bermudas"
  },

  // Norteamérica (Multi-husos de Canadá y México)
  {
    id: "calgary",
    name: "Calgary",
    country: "Canadá",
    countryCode: "CA",
    timezone: "America/Edmonton",
    lat: 51.0447,
    lng: -114.0719,
    population: 1336000,
    region: "Norteamérica",
    seoSlug: "hora-en-calgary",
    seoTitle: "Hora exacta en Calgary, Canadá"
  },
  {
    id: "winnipeg",
    name: "Winnipeg",
    country: "Canadá",
    countryCode: "CA",
    timezone: "America/Winnipeg",
    lat: 49.8951,
    lng: -97.1384,
    population: 749000,
    region: "Norteamérica",
    seoSlug: "hora-en-winnipeg",
    seoTitle: "Hora exacta en Winnipeg, Canadá"
  },
  {
    id: "halifax",
    name: "Halifax",
    country: "Canadá",
    countryCode: "CA",
    timezone: "America/Halifax",
    lat: 44.6488,
    lng: -63.5752,
    population: 440000,
    region: "Norteamérica",
    seoSlug: "hora-en-halifax",
    seoTitle: "Hora exacta en Halifax, Canadá"
  },
  {
    id: "st-johns",
    name: "St. John's",
    country: "Canadá",
    countryCode: "CA",
    timezone: "America/St_Johns",
    lat: 47.5615,
    lng: -52.7126,
    population: 110500,
    region: "Norteamérica",
    seoSlug: "hora-en-st-johns",
    seoTitle: "Hora exacta en St. John's, Terranova, Canadá"
  },
  {
    id: "tijuana",
    name: "Tijuana",
    country: "México",
    countryCode: "MX",
    timezone: "America/Tijuana",
    lat: 32.5149,
    lng: -117.0382,
    population: 1922000,
    region: "Norteamérica",
    seoSlug: "hora-en-tijuana",
    seoTitle: "Hora exacta en Tijuana, México"
  },
  {
    id: "cancun",
    name: "Cancún",
    country: "México",
    countryCode: "MX",
    timezone: "America/Cancun",
    lat: 21.1619,
    lng: -86.8515,
    population: 888000,
    region: "Norteamérica",
    seoSlug: "hora-en-cancun",
    seoTitle: "Hora exacta en Cancún, Quintana Roo, México"
  },
  {
    id: "hermosillo",
    name: "Hermosillo",
    country: "México",
    countryCode: "MX",
    timezone: "America/Hermosillo",
    lat: 29.0729,
    lng: -110.9559,
    population: 936000,
    region: "Norteamérica",
    seoSlug: "hora-en-hermosillo",
    seoTitle: "Hora exacta en Hermosillo, Sonora, México"
  },

  // --- Oceanía y el Pacífico ---
  {
    id: "adelaide",
    name: "Adelaida",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Adelaide",
    lat: -34.9285,
    lng: 138.6007,
    population: 1387290,
    region: "Oceanía",
    seoSlug: "hora-en-adelaida",
    seoTitle: "Hora exacta en Adelaida, Australia"
  },
  {
    id: "brisbane",
    name: "Brisbane",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Brisbane",
    lat: -27.4698,
    lng: 153.0251,
    population: 2560700,
    region: "Oceanía",
    seoSlug: "hora-en-brisbane",
    seoTitle: "Hora exacta en Brisbane, Australia"
  },
  {
    id: "suva",
    name: "Suva",
    country: "Fiyi",
    countryCode: "FJ",
    timezone: "Pacific/Fiji",
    lat: -18.1416,
    lng: 178.4419,
    population: 93970,
    region: "Oceanía",
    seoSlug: "hora-en-suva",
    seoTitle: "Hora exacta en Suva, Fiyi"
  },
  {
    id: "papeete",
    name: "Papeete",
    country: "Polinesia Francesa",
    countryCode: "PF",
    timezone: "Pacific/Tahiti",
    lat: -17.5516,
    lng: -149.5584,
    population: 26926,
    region: "Oceanía",
    seoSlug: "hora-en-papeete",
    seoTitle: "Hora exacta en Papeete, Polinesia Francesa"
  }
];

export const DEFAULT_USER_CITY = CITIES_DATABASE.find(c => c.id === "santo-domingo") || CITIES_DATABASE[0];

export function getDetectedUserCity(): City {
  try {
    const userTimezone = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch {
        return '';
      }
    })();

    const isDominicanDevice =
      userTimezone === 'America/Santo_Domingo' ||
      userTimezone.includes('Santo_Domingo') ||
      (typeof navigator !== 'undefined' && (navigator.language === 'es-DO' || (navigator.languages && navigator.languages.includes('es-DO'))));

    // Si el dispositivo está en Santo Domingo, siempre Santo Domingo
    if (isDominicanDevice) {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('941_detected_ip_city') === 'new-york') {
        localStorage.removeItem('941_detected_ip_city');
      }
      return DEFAULT_USER_CITY;
    }

    // 0. Check for cached IP-detected city
    const cachedIpCity = typeof localStorage !== 'undefined' ? localStorage.getItem('941_detected_ip_city') : null;
    if (cachedIpCity) {
      const match = CITIES_DATABASE.find(c => c.id === cachedIpCity);
      if (match) return match;
    }

    if (userTimezone) {
      // 1. Exact timezone match in database
      const exactMatch = CITIES_DATABASE.find(c => c.timezone === userTimezone);
      if (exactMatch) {
        // Excepción conocida: America/La_Paz en equipos corporativos de República Dominicana
        if (exactMatch.id === 'la-paz' && typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) {
          return DEFAULT_USER_CITY;
        }
        return exactMatch;
      }

      // 2. Match by current UTC offset string
      const now = new Date();
      const userTzOffset = new Intl.DateTimeFormat('en-US', { timeZone: userTimezone, timeZoneName: 'short' }).format(now);
      const sdOffset = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santo_Domingo', timeZoneName: 'short' }).format(now);
      
      const isSpanish = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es');
      if (userTzOffset === sdOffset && isSpanish) {
        return DEFAULT_USER_CITY;
      }

      const matchByOffset = CITIES_DATABASE.find(c => {
        const cOffset = new Intl.DateTimeFormat('en-US', { timeZone: c.timezone, timeZoneName: 'short' }).format(now);
        return cOffset === userTzOffset;
      });
      if (matchByOffset) return matchByOffset;

      // 3. Dynamic City object fallback for unrecognized IANA timezones
      const tzParts = userTimezone.split('/');
      const rawCityName = (tzParts[tzParts.length - 1] || userTimezone).replace(/_/g, ' ');
      const rawCountryName = tzParts[0] || 'Local';
      const cleanSlug = `hora-en-${rawCityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      return {
        id: `auto-${userTimezone.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: rawCityName,
        country: rawCountryName,
        countryCode: 'LOC',
        timezone: userTimezone,
        lat: 0,
        lng: 0,
        population: 0,
        region: 'Local',
        seoSlug: cleanSlug,
        seoTitle: `Hora exacta en ${rawCityName}`
      };
    }
  } catch (err) {
    console.error('Error detecting user system timezone:', err);
  }
  return DEFAULT_USER_CITY;
}

export function getRandomCities(excludeIds: string[], count: number = 2): City[] {
  const filtered = CITIES_DATABASE.filter(c => !excludeIds.includes(c.id));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export interface CityAirport {
  name: string;
  iata: string;
}

const AIRPORTS_MAP: Record<string, CityAirport> = {
  "ciudad-de-mexico": { name: "Aeropuerto Internacional Benito Juárez", iata: "MEX" },
  "santo-domingo": { name: "Aeropuerto Internacional Las Américas", iata: "SDQ" },
  "nueva-york": { name: "John F. Kennedy International Airport", iata: "JFK" },
  "madrid": { name: "Aeropuerto Adolfo Suárez Madrid-Barajas", iata: "MAD" },
  "londres": { name: "London Heathrow Airport", iata: "LHR" },
  "tokio": { name: "Tokyo Haneda Airport", iata: "HND" },
  "paris": { name: "Aéroport de Paris-Charles de Gaulle", iata: "CDG" },
  "los-angeles": { name: "Los Angeles International Airport", iata: "LAX" },
  "miami": { name: "Miami International Airport", iata: "MIA" },
  "chicago": { name: "O'Hare International Airport", iata: "ORD" },
  "buenos-aires": { name: "Aeropuerto Internacional Ezeiza", iata: "EZE" },
  "bogota": { name: "Aeropuerto Internacional El Dorado", iata: "BOG" },
  "santiago": { name: "Aeropuerto Internacional Arturo Merino Benítez", iata: "SCL" },
  "lima": { name: "Aeropuerto Internacional Jorge Chávez", iata: "LIM" },
  "sao-paulo": { name: "Aeroporto Internacional de São Paulo-Guarulhos", iata: "GRU" },
  "rio-de-janeiro": { name: "Aeroporto Internacional do Rio de Janeiro-Galeão", iata: "GIG" },
  "berlin": { name: "Flughafen Berlin Brandenburg", iata: "BER" },
  "roma": { name: "Aeroporto di Roma-Fiumicino", iata: "FCO" },
  "amsterdam": { name: "Amsterdam Airport Schiphol", iata: "AMS" },
  "toronto": { name: "Toronto Pearson International Airport", iata: "YYZ" },
  "sidney": { name: "Sydney Kingsford Smith Airport", iata: "SYD" },
  "dubai": { name: "Dubai International Airport", iata: "DXB" },
  "singapur": { name: "Singapore Changi Airport", iata: "SIN" },
  "hong-kong": { name: "Hong Kong International Airport", iata: "HKG" },
  "seul": { name: "Incheon International Airport", iata: "ICN" },
  "pekin": { name: "Beijing Capital International Airport", iata: "PEK" },
  "shanghai": { name: "Shanghai Pudong International Airport", iata: "PVG" },
  "moscu": { name: "Sheremetyevo International Airport", iata: "SVO" },
  "estambul": { name: "Istanbul Airport", iata: "IST" },
  "el-cairo": { name: "Cairo International Airport", iata: "CAI" },
  "johannesburgo": { name: "O.R. Tambo International Airport", iata: "JNB" },
  "la-paz": { name: "Aeropuerto Internacional El Alto", iata: "LPB" },
  "san-juan": { name: "Aeropuerto Internacional Luis Muñoz Marín", iata: "SJU" },
  "washington": { name: "Washington Dulles International Airport", iata: "IAD" },
  "san-francisco": { name: "San Francisco International Airport", iata: "SFO" },
  "seattle": { name: "Seattle-Tacoma International Airport", iata: "SEA" },
  "boston": { name: "Boston Logan International Airport", iata: "BOS" },
  "atlanta": { name: "Hartsfield-Jackson Atlanta International Airport", iata: "ATL" },
  "houston": { name: "George Bush Intercontinental Airport", iata: "IAH" },
  "dallas": { name: "Dallas/Fort Worth International Airport", iata: "DFW" },
  "barcelona": { name: "Aeropuerto Josep Tarradellas Barcelona-El Prat", iata: "BCN" },
  "munich": { name: "Flughafen München Franz Josef Strauß", iata: "MUC" },
  "zurich": { name: "Flughafen Zürich", iata: "ZRH" },
  "viena": { name: "Flughafen Wien-Schwechat", iata: "VIE" },
  "bruselas": { name: "Brussels Airport", iata: "BRU" },
  "lisboa": { name: "Aeroporto Humberto Delgado", iata: "LIS" },
  "atenas": { name: "Athens International Airport Eleftherios Venizelos", iata: "ATH" },
  "bangkok": { name: "Suvarnabhumi Airport", iata: "BKK" },
  "nueva-delhi": { name: "Indira Gandhi International Airport", iata: "DEL" },
  "mumbai": { name: "Chhatrapati Shivaji Maharaj International Airport", iata: "BOM" },
  "managua": { name: "Aeropuerto Internacional Augusto C. Sandino", iata: "MGA" },
  "ciudad-de-belice": { name: "Philip S. W. Goldson International Airport", iata: "BZE" },
  "georgetown": { name: "Cheddi Jagan International Airport", iata: "GEO" },
  "paramaribo": { name: "Johan Adolf Pengel International Airport", iata: "PBM" },
  "cayena": { name: "Aéroport de Cayenne-Félix Eboué", iata: "CAY" },
  "manaus": { name: "Aeroporto Internacional de Manaus-Eduardo Gomes", iata: "MAO" },
  "fernando-de-noronha": { name: "Aeroporto de Fernando de Noronha", iata: "FEN" },
  "isla-de-pascua": { name: "Aeropuerto Internacional Mataveri", iata: "IPC" },
  "islas-galapagos": { name: "Aeropuerto Seymour de Baltra", iata: "GPS" },
  "puerto-principe": { name: "Aéroport International Toussaint Louverture", iata: "PAP" },
  "nasau": { name: "Lynden Pindling International Airport", iata: "NAS" },
  "puerto-espana": { name: "Piarco International Airport", iata: "POS" },
  "bridgetown": { name: "Grantley Adams International Airport", iata: "BGI" },
  "willemstad": { name: "Curaçao International Airport", iata: "CUR" },
  "oranjestad": { name: "Queen Beatrix International Airport", iata: "AUA" },
  "castries": { name: "Hewanorra International Airport", iata: "UVF" },
  "saint-john": { name: "V. C. Bird International Airport", iata: "ANU" },
  "saint-george": { name: "Maurice Bishop International Airport", iata: "GND" },
  "kingstown": { name: "Argyle International Airport", iata: "SVD" },
  "roseau": { name: "Douglas-Charles Airport", iata: "DOM" },
  "basseterre": { name: "Robert L. Bradshaw International Airport", iata: "SKB" },
  "george-town-caiman": { name: "Owen Roberts International Airport", iata: "GCM" },
  "hamilton-bermudas": { name: "L.F. Wade International Airport", iata: "BDA" },
  "calgary": { name: "Calgary International Airport", iata: "YYC" },
  "winnipeg": { name: "Winnipeg Richardson International Airport", iata: "YWG" },
  "halifax": { name: "Halifax Stanfield International Airport", iata: "YHZ" },
  "st-johns": { name: "St. John's International Airport", iata: "YYT" },
  "tijuana": { name: "Aeropuerto Internacional de Tijuana", iata: "TIJ" },
  "cancun": { name: "Aeropuerto Internacional de Cancún", iata: "CUN" },
  "hermosillo": { name: "Aeropuerto Internacional General Ignacio Pesqueira García", iata: "HMO" }
};

export function getCityAirport(city: City): CityAirport {
  if (AIRPORTS_MAP[city.id]) {
    return AIRPORTS_MAP[city.id];
  }
  return {
    name: `Aeropuerto Internacional de ${city.name}`,
    iata: city.countryCode
  };
}

