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
  }
];

export const DEFAULT_USER_CITY = CITIES_DATABASE.find(c => c.id === "santo-domingo") || CITIES_DATABASE[0];

export function getDetectedUserCity(): City {
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (userTimezone) {
      // 1. Exact timezone match in database
      const exactMatch = CITIES_DATABASE.find(c => c.timezone === userTimezone);
      if (exactMatch) return exactMatch;

      // 2. Match by current UTC offset string
      const now = new Date();
      const userTzOffset = new Intl.DateTimeFormat('en-US', { timeZone: userTimezone, timeZoneName: 'short' }).format(now);
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
