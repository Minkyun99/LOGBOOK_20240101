import { promises as fs } from 'fs';

// Ship key와 ship name 배열
const cido_shipkey = ['3FPB','VRTB8','VRMB8','VRKL7','VRHW2','3EPV3','H8MK','3EOR3','3FDW9','3EDQ','3FRA8','3EHY','H3WF','3ECP7',  'HOXM',  '3EKW7',  '3FYG8',  'H3LL',  'HOOC',  '3EEX9',  '3EES',  '3FGJ9',  '3EAG4',  'HOWE',  'HOBN',  '3FTO9',  '3FZH9',  '3EIU3',  '3EJH',  'VRRG3',  '3FWB5',  '3EGG5',  '3ERC7',  'VRBW8',  'H3HZ',  'VRHC7',  'VRHO3']
const cido_shipname = ['DREAM ORCHID','FORTUNE BELL','FORTUNE TIGER','FORTUNE VIOLET','FORTUNE WING','GOLD ESTRELLA','GRAND AURORA','GRAND CHAMPION','GRAND CHOICE','GRAND COSMO','GRAND DAHLIA','GRAND DIAMOND','GRAND DOLPHIN','GRAND DUKE','GRAND EAGLE','GRAND HERO','GRAND LEGACY','GRAND MARK','GRAND MERCURY','GRAND NEPTUNE','GRAND ORION','GRAND PACE','GRAND PAVO','GRAND PHOENIX','GRAND PIONEER','GRAND QUEST','GRAND RACE','GRAND RUBY','GRAND SAPPHIRE','GRAND URANUS','GRAND VEGA','GRAND VENUS','GRAND VICTORY','GREAT NAVIGATOR','MODERN LINK','SPRING SKY','SPRING WIND']

const POLARIS_shipkey = ['V7EA5','V7OY9','V7FA9','V7A2061','V7A2218','V7A2302','V7A2303','V7A2304','V7A2305','V7A2306','3FML6','3FOY2','3FWQ7','3ETY8','3FYQ','3FKA8','VRQI8','VRQI9','VRQI7','VRQJ2','V7OP5','3FID9','3EON6','3FGW7','3ENC6','3FUX3','V7QW5','V7SW5','3EYF7','3FDC6','3EJX9']
const POLARIS_shipname = ['POLAR ACE','POLAR BRIGHT','SAO DIANA','SAO EBBA','SAO FABIAN','SAO GRACE','SAO HEAVEN','SAO INDIGO','SAO JOY','SAO KAREN','SAO QUIXOTE','SAO ROSE OF SHARON','SAO SABIA','SAO TITAN','SAO UNISON','SOLAR DOLPHIN','SOLAR FRONTIER','SOLAR GLORY','SOLAR HOPE','SOLAR ICON','SOLAR LEGEND','SOLAR MAJESTY','SOLAR NOVA','SOLAR OAK','SOLAR PRIDE','SOLAR QUANTUM','STELLAR ACE','STELLAR CROWN','STELLAR VENTURE','STELLAR WAY','STELLAR YOUNG']

const POSSM_shipkey = ['V7YS2','V7ZK3','V7RD7','V7RD8','V7AH6','3E3975','3EJD9','3E2119','3EMU8','V7AQ5','V7A2104','3EEH2','3EPV8','3EQZ9','3ETG3','3EIG9','3EIW4','3EPV7','3E2391','3E2390','3FZH2','HPOZ','3E3968','3E3969','V7A2204','V7BV5','HPSS','3FNM7','3E2615','3FUG9','3FQN','V7XS5','V7TG8','3FFB8','V7YM2','V7TI9','3EXW2','V7Y17','V7VX2','V7IU7','V7ZW3','3FSM4','V7XV3','3FLN3','3FHN3','3FZO9','D7DA','3EWI6','V7SB5','3ETU2','3FQI','D7CN','D7EH','3EZL9','3EVF9','3E3447','3EWB4','V7VI5','3FFY4','V7WY3','V7WS2','3E3444','3FFH3','V7XJ9','D7EX','3EAE5','3ETS8','DB9BA2C','5LML3','3FRW9','5LMV5','3FUP4','3FAA3','3FQI8','3EGA9','3FMZ5','3FDN3','3FDX9','3E3870','4117','5LOE2','3E3863','D7PS','4E0F8FD','DSNZ8','DSOU4','V7A2215','V7A2216','V7XB3','3EQS6','V7YY5','V7ZA5','3FUS7','V7ZH3','V7BB5','D8F0','V7XR6','HOYT','HOEL','V7ZU6','HOLO','HPLT','3EVH6','V7ZD3','H9JL','3FFJ8','3EWW5','H3TY','3FSV8','V7A2217']
const POSSM_shipname = ['ARBORELLA','BRASSIANA','BUM SHIN','BUM YOUNG','CITRIODORA','CS BREEZE','CS CRANE','CS HANA','CS SUMMER','DELICATA','DUNNII','GRAND ACE1','GRAND ACE10','GRAND ACE11','GRAND ACE12','GRAND ACE5','GRAND ACE6','GRAND ACE9','GRAND AMBITION','GRAND BONANZA','GRAND WINNER 1','GRAND WINNER 2','GRAND WINNER 3','GRAND WINNER 5','GRANDIS','HALOPHYLA','HL MIDLAND','LNG KOLT','NEW APEX','PAN ACACIA','PAN ADVANCE','PAN AMBER','PAN BICORN','PAN BONA','PAN BONITA','PAN CERES','PAN CHAMPION','PAN CLOVER','PAN COSMOS','PAN DANGJIN','PAN DELIGHT','PAN DREAM','PAN ENERGEN','PAN EPIC','PAN FALCON','PAN FLOWER','PAN FORTUNE','PAN FREEDOM','PAN FREESIA','PAN GLOBAL','PAN GOLD','PAN GRACE','PAN HARVEST','PAN HOPE','PAN HORIZON','PAN IMPERIAL','PAN IRIS','PAN JASMINE','PAN JOY','PAN KOMIPO','PAN KRISTINE','PAN MAJESTY','PAN MARGARET','PAN MUTIARA','PAN NAVIGATOR','PAN NOVA','PAN OPTIMUM','PAN ORION','PAN PEGASUS','PAN POSEIDON','PAN QUANTUM','PAN QUEEN','PAN QUEST','PAN RAPIDO','PAN REGINA','PAN TOPAZ','PAN VIVA','POS BANGKOK','POS GUANGZHOU','POS HOCHIMINH','POS LAEMCHABANG','POS QINGDAO','POS SHANGHAI','POS SINGAPORE','POS TOKYO','POS YOKOHAMA','ROBUSTA','SALIGNA','SEA BEIJING','SEA CAOFEIDIAN','SEA ESPIRITO SANTO','SEA FUJIYAMA','SEA GUAIBA','SEA INDONESIA','SEA MARANHAO','SEA PONTA DA MADEIRA','SEA QINGDAO','SEA RIO DE JANEIRO','SEA SHANGHAI','SEA TUBARAO','SEA VICTORIA','SEA ZHOUSHAN','SUN ORCHID','SUN RISE','SUN SHINE','SUPER EASTERN','SUPER FORTE','SUPER HERO','SUPER INFINITY','UROPHYLLA']

const FMLK_shipkey = ['3ENU2','3FGP4','3FLT2','3FXC5','HOZL','3EXM5']
const FMLK_shipname = ['GRAND ACE7','PAN EMERALD','PAN IVY','PAN PRIDE','PAN SPIRIT','PAN UNITY']

const STX_shipkey = ['3ETW3','3FAP9','D7CE','3FRN','3ETV','3FZM9','D7EN','3FFH8','3EWS2','3FXI6','H3NZ','3EYW2','DSQX6','D8BI','DSPE','DSRM5','D7FW','DSMZ4','DSMZ7','D7GC','D7CK','DSQM7','DSRL5','DSMA8','D5XF3','V7MI8','V7FV2','V7A2271','V7JJ8']
const STX_shipname = ['BK ALICE','DL ACACIA','DL ADONIS','DL DAHLIA','DL IVY','DL JASMINE','DL LAVENDER','DL LILAC','DL MARIGOLD','DL OLIVE','DL PANSY','DL TULIP','DONGBANG GIANT NO.3','DONGBANG GIANT NO.6','DONGBANG GIANT NO.7','DONGBANG GIANT NO.8','INWANG','MEGA CARAVAN','MEGA CARAVAN 2','MINERAL CHINA','ORIENTAL ENTERPRISE','ORIENTAL FRONTIER','ORIENTAL LEADER','ORIENTAL NAVIGATOR','ORIENTAL STAR','SEA FUTURE','SEA HONESTY','SHINSUNG CLEVER','ULTRA ALPHA']

const DORIKO_shipkey = ['3FBO9','P3ZU9','DSPL8','HP6652','3FKQ7','3FWI3','DSQV8','3FQI','HOZL','3FUX9','V7A2897','V7A5958','D7MD','3E3409','3ELP9']
const DORIKO_shipname = ['AH SHIN','CHANG SHIN','CRYSTAL OCEAN','G POSEIDON','GMT ASTRO','HAE SHIN','LADY CEDROS','PAN GLOD','PAN SPIRIT','SANG SHIN','SEA COEN','SEA GRACE','SJ ASIA','SOO SHIN','YOUNG SHIN']

const TAIKOON_shipkey = ['3FTT2','3EPT4','D7LA','3EWR4','HPSV','D7UK','D7VR','3EYW9','3EGI8','V7IN4','D7FB','D7AD','D7SI']
const TAIKOON_shipname = ['CARIBBEAN1','DM CONDOR','DM DRAGON','DM EMERALD','DM JADE','DS COUGAR','DS OCEAN','FG ROTTERDAM','GOLDEN DENISE','JBU OPAL','JBU SAPPHIRE','KOREA CHEMI','MEDIA']

const KSS_shipkey = ['3FDR8',  '3EPB500001',  '3EDU7',  '3FDX3',  '3EBU9',  '3E2394',  '3E2162',  '3E2279',  '3E2302',  '3EVE2',  '3FUO4',  '3FJI5',  '3FAW3',  '3EXG8',  '3EKX',  'H9CC',  '3EYK6',  '3EDJ',  'H9FO',  '3E2694',  '3EVI5']
const KSS_shipname = ['GAS ARES','GAS BARBAROSSA','GAS FRIEND','GAS GABRIELA','GAS GALA','GAS GHAZI','GAS IVORY','GAS JUSTESEN','GAS KAISERIN','GAS POWER','GAS QUANTUM','GAS STAR','GAS SUMMIT','GAS UTOPIA','GAS VENUS','GAS WISDOM','GAS YOUNG','GAS ZENITH','HARMONY CHEMIST','SAVONETTA SUN','JOY CHEMIST']

const HANARO_shipkey = ['3EWP4','V7PI4','3FNP9','3FYZ9','3FBP6','D7DU','3EYH2','DSQY8','3FGM6']
const HANARO_shipname = ['PHOENIX NEREID','SEA DIAMOND','SEA EMPIRE','SEA HOPE','SEA OPAL','SEA ORION','SEA SAPPHIRE','SEA TOPAZ','SEN TREASURE']

const KSM_shipkey = ['D7JT',  'D7CR',  'D7CM',  '3FRC',  'D7AC',  '3FBD4']
const KSM_shipname = ['BON CHALLENGER','CNC RICH','CS ONSAN','DAEWOO DIAMOND','NOEL','SEA CRYSTAL']

const WILHELMSEN_shipkey = ['HOWM',  '3E2301']
const WILHELMSEN_shipname = ['NEW FRONTIER1', 'NEW FRONTIER2']

const SNGLOBAL_shipkey = ['D8SH',  'D5225']
const SNGLOBAL_shipname = ['SN OPAL',  'SN SERENITY']

const NJSM_shipkey = ['D7BB',  'D7BX',  'D7VY']
const NJSM_shipname = ['JN CAMELLIA',  'JN IRIS',  'JN NEPTUNE']

const MEGALINE_shipkey = ['DSQH4',  'DSQU2']
const MEGALINE_shipname = ['MEGA TRUST',  'MEGA PASSION']

const KORINSTAR_shipkey = ['D7ST',  'OUHH2',  '3E2386',  'DSQN4']
const KORINSTAR_shipname = ['KS ADONIS',  'KS CAMELLIA',  'KS GRACE',  'POLARIS']

const FAIR_shipkey = ['DSOU8',  'DSPS9',  'DSMC3',  '3FNX4',  '9910366',  'DSRC7',  'DSRH5']
const FAIR_shipname = ['DONGBANG GIANT NO.1',  'DONGBANG GIANT NO.2',  'DONGBANG GIANT NO.5',  'DONGHAE STAR',  'HANSUNG INCHEON',  'KOOKYANG EXPRESS',  'KOOKYANG SINGAPORE']

const SHINSUNG_shipkey = ['D7BY',  'D9YB',  'DSRD4']
const SHINSUNG_shipname = ['SHINSUNG ACCORD',  'SHINSUNG BRIGHT',  'SHINSUNG EVER']

const BEOMJOO_shipkey = ['D7XB',  'D7SP',  'DSRI4',  'D7UY',  'DSRI7',  'D7CO',  'D7CC']
const BEOMJOO_shipname = ['PANCON BRIDGE',  'PANCON CHAMPION',  'PANCON GLORY',  'PANCON HARMONY',  'PANCON SUCCESS',  'PANCON SUNSHINE',  'PANCON VICTORY']

const JOONGANG_shipkey = ['V7A2922',  'V7A2923',  'D7ON',  'D7LO',  '8101752']
const JOONGANG_shipname = ['GLAD YOUNG',  'SOUND YOUNG',  'YOUNG GLORY',  'YOUNG HARMONY',  'YOUNG SPIRIT']

const SINOKOR_shipkey = ['V7A2515',  'V7AP8',  'V7A2815']
const SINOKOR_shipname = ['BALTIC WEST',  'OCEAN CARRIER',  'SAWASDEE SUNRISE']

const LEESHIPPING_shipkey = ['3ESS6',  '3FHE7']
const LEESHIPPING_shipname = ['RABIGH SUNSHINE',  'BUENA CONFIANZA']

const HANGANG_shipkey = ['D7AY',  'D7DJ',  'D7FH']
const HANGANG_shipname = ['GOLDEN MAPLE',  'MAPLE HARBOUR',  'MAPLE MARINA']

const SEONGHO_shipkey = ['D8SV',  'V00001',  'DSQJ6',  '3E2137',  '3E2114']
const SEONGHO_shipname = ['NEW SILVER',  'NEW STAR',  'SEONGHO ACE',  'SH OLIVIA',  'SH VENUS']

const PANBULK_shipkey = ['5LOP5',  '5LGU2',  'VTUN',  'AURJ',  '5LDH4']
const PANBULK_shipname = ['RIPLEY PINNACLE',  'RIPLEY PIONEER',  'RIPLEY PRIDE',  'RIPLEY PROGRESS',  'RIPLEY PROSPERITY']

const WOCEAN_shipkey = ['3FRW5', 'D7XE',  'DSQQ4',  'DSRA9'] 
const WOCEAN_shipname = ['WOOHYUN STAR',  'WOOHYUN SKY',  'WOOHYUN HOPE',  'WOOHYUN GREEN']

const GFSM_shipkey = ['DSMB2',  'DSRH6',  'V7A5556',  'V7A5809']
const GFSM_shipname = ['DAESAN CHEMI',  'ONSAN CHEMI',  'THAI CHEMI',  'BANGKOK CHEMI']

const PIL_shipname = ["KOTA AZAM","KOTA CABAR","KOTA CAHAYA","KOTA CANTIK","KOTA CARUM","KOTA CEMPAKA","KOTA CEPAT","KOTA DAHLIA","KOTA DUNIA","KOTA DUTA","KOTA GABUNG","KOTA GADANG","KOTA GANDING","KOTA GAYA","KOTA HAKIM","KOTA HALUS","KOTA HANDAL","KOTA HAPAS","KOTA HARUM","KOTA HENING","KOTA HIDAYAH","KOTA JAYA","KOTA JOHAN","KOTA KAMIL","KOTA KARIM","KOTA KAYA","KOTA LAGU","KOTA LAMBAI","KOTA LAMBANG","KOTA LARIS","KOTA LAWA","KOTA LAYANG","KOTA LEGIT","KOTA LEKAS","KOTA LEMBAH","KOTA LESTARI","KOTA LIMA","KOTA LOCENG","KOTA LUKIS","KOTA LUMAYAN","KOTA LUMBA","KOTA MACHAN","KOTA MAKMUR","KOTA MANIS","KOTA MEGAH","KOTA NABIL","KOTA NAGA","KOTA NALURI","KOTA NANHAI","KOTA NASRAT","KOTA NAZAR","KOTA NAZIM","KOTA NEBULA","KOTA NEKAD","KOTA NILAM","KOTA NIPAH","KOTA PAHLAWAN","KOTA PURI","KOTA PUSAKA","KOTA RAHMAT","KOTA RAJA","KOTA RAJIN","KOTA RAKAN","KOTA RAKYAT","KOTA RANCAK","KOTA RATNA","KOTA RATU","KOTA RESTU","KOTA RIA","KOTA RUKUN","KOTA SAHABAT","KOTA SALAM","KOTA SANTOS","KOTA SATRIA","KOTA SEGAR","KOTA SEJARAH","KOTA SEJATI","KOTA SELAMAT","KOTA SEMPENA","KOTA SETIA","KOTA SINGA","KOTA SURIA","KOTA TEMA","KOTA TENAGA","SALAM MAJU","SELATAN DAMAI"]
const PIL_shipkey = ["S6BL","9V6247","9V7831","9V7835","9V7838","9VLP3","9VLP8","9VED9","9V7847","9V8167","9V7465","9V7643","9V7660","9V7466","9V8257","9V8258","9V7329","9V8259","9VFF8","9V7332","9VAL4","9V7333","VRQR6","9VJK6","9V7839","3ENH5","9V7258","9VFX5","9VFX9","9V7259","9V7472","9V7337","9V8481","9V8480","9V7665","9V2116","D5JI9","9V7667","VRSN8","VRSO2","VRSO3","9V9976","VRRC2","9V9975","9V9978","9VFX3","9VFX4","9VHP2","9VHM9","9V7346","9V8600","9VEY4","9V6396","H3HS","3EZQ8","9V9332","9V5293","VRSB5","VRSB2","9VEY2","S6SS","S6BH6","9V7348","9VJK5","S6BH8","S6TI","S6ST","9V8166","9VJK4","S6TJ","9V2122","9V2123","D5WO7","9V2124","9V2125","9V2126","9V2127","9V2128","9V2129","9V2130","9V2131","9V2132","9V9309","S6AL7","9M2383","YBQR2",]

const HOS_shipname = ["VL BRILLIANT"]
const HOS_shipkey =['H9VU']

const EsMaritime_shipname = ["SEA CRYSTAL"]
const EsMaritime_shipkey = ["3FBD4"]

const YOUHAMARINE_shipname =["CS SUMMER", "CS BREEZE", "CS HANA"]
const YOUHAMARINE_shipkey =["3EMU8", '3E3975', '3E2119']

const GLOVIS_shipname =['GLOVIS CARDINAL', 'GLOVIS COMPANION', 'GLOVIS SILVER', 'GLOVIS SONIC','GLOVIS SUNLIGHT', 'GLOVIS SUNRISE', 'VL BREEZE']
const GLOVIS_shipkey =['D7GV', '5LBH4', 'D7FY', 'V7ML7', 'V7JP5', 'V7EO2', '5LEK3']

const SONGA_shipname = ['SONGA PUMA', 'SONGA SAPPHIRE' ]
const SONGA_shipkey = ['D5YU9', '9HA4873']

const SK_SHIPPING_shipname = ['C.GLORY', 'SK_TEST1']
const SK_SHIPPING_shipkey = ['3FQD4', 'SKTEST1']

const TMS_shipname = ['GNS HARVEST', 'GNS HARMONY', 'GNS HOPE']
const TMS_shipkey = ['3ELB7', 'V7QK7', 'D8BK']

const KLCSM_shipname = ['ADONIS', 'GLOBAL BRAVE', 'GLOBAL FRONTIER', 'GLOBAL GENESIS', 'GLOBAL HOPE', 'K.ACACIA', 'K.ASIAN BEAUTY', 'K.ASTER', 'K.DAPHNE', 'K.FREESIA', 'K.JASMINE', 'K.MUGUNGWHA', 'LAVENDER', 'ROSEMARY', 'SM CHALLENGER', 'SM DIAMOND', 'SM DONGHAE', 'SM DONGHAE 2', 'SM DRAGON', 'SM EAGLE', 'SM EMERALD', 'SM FALCON', 'SM GEMINI 1', 'SM GEMINI2', 'SM HARMONY1', 'SM HARMONY2', 'SM HEDLAND', 'SM JEJU LNG1', 'SM JEJU LNG2', 'SM LION', 'SM NAVIGATOR', 'SM NEWORLEANS', 'SM OSPREY', 'SM PUMA', 'SM ROBERTS BANK', 'SM SAMCHEONPO', 'SM SANTOS', 'SM SEAHAWK', 'SM TIGER', 'SM VENUS1', 'SM VENUS2', 'SM VISION', 'SM WHITE WHALE 1', 'SM WHITE WHALE 2', 'WHITE ROSE']
const KLCSM_shipkey = ['3EGH4', '3FHX4', 'H3TS', '3FLO2', '3EZY7', '3FQY9', '3EUH5', '3FUB2', '3EZF9', 'H3DP', '3EPQ5', '3ETM6', '3FHG3', '3FBU8', 'V7TJ5', '3FIJ5', '3FLR8', '3FMR6', '3FJZ7', '3EMX3', '3EHZ7', 'H3MW', '3FYA6', '3FVP5', 'V7A2878', 'D7VO', 'V7BW6', '3FTI8', '3ESH2', '3EKG8', '3ESW6', 'V7A2392', '3ECA6', '3END5', 'V7A2565', 'V7A2310', 'V7A2689', '3FLV3', '3FEJ7', '3EQL8', '3EZX3', '3EJN6', '3FND8', '3FCV5', '3EEW7']

const HMM_shipname=	['HMM PROMISE', 'HMM BLESSING']	
const HMM_shipkey = ['V7VY7', 'V7JK6']

function makejson_shipkey (shipnames, shipkeys) {
    return shipnames.map((name, index) => ({
      SHIPNAME: name,
      SHIPKEY: shipkeys[index]
    }));
  }
  
  // Creating the final object
  const finalObject = {
    CIDO: makejson_shipkey (cido_shipname, cido_shipkey),
    POLARIS: makejson_shipkey (POLARIS_shipname, POLARIS_shipkey),
    POSSM: makejson_shipkey (POSSM_shipname, POSSM_shipkey),
    FMLK: makejson_shipkey (FMLK_shipname, FMLK_shipkey),
    STX : makejson_shipkey (STX_shipname, STX_shipkey),
    DORIKO : makejson_shipkey (DORIKO_shipname, DORIKO_shipkey),
    TAIKOON : makejson_shipkey (TAIKOON_shipname, TAIKOON_shipkey),
    KSS : makejson_shipkey (KSS_shipname, KSS_shipkey),
    HANARO : makejson_shipkey (HANARO_shipname, HANARO_shipkey),
    KSM : makejson_shipkey (KSM_shipname, KSM_shipkey),
    WILHELMSEN : makejson_shipkey (WILHELMSEN_shipname, WILHELMSEN_shipkey),
    SNGLOBAL : makejson_shipkey (SNGLOBAL_shipname, SNGLOBAL_shipkey),
    NJSM : makejson_shipkey(NJSM_shipname, NJSM_shipkey),
    MEGALINE : makejson_shipkey (MEGALINE_shipname, MEGALINE_shipkey),
    KORINSTAR : makejson_shipkey (KORINSTAR_shipname, KORINSTAR_shipkey),
    FAIR : makejson_shipkey (FAIR_shipname, FAIR_shipkey),
    SHINSUNG : makejson_shipkey (SHINSUNG_shipname, SHINSUNG_shipkey),
    BEOMJOO : makejson_shipkey (BEOMJOO_shipname, BEOMJOO_shipkey),
    JOONGANG : makejson_shipkey (JOONGANG_shipname, JOONGANG_shipkey),
    SINOKOR : makejson_shipkey (SINOKOR_shipname, SINOKOR_shipkey),
    LEESHIPPING : makejson_shipkey (LEESHIPPING_shipname, LEESHIPPING_shipkey),
    HANGANG : makejson_shipkey (HANGANG_shipname, HANGANG_shipkey),
    SEONGHO : makejson_shipkey (SEONGHO_shipname, SEONGHO_shipkey),
    BEOMJOO : makejson_shipkey (BEOMJOO_shipname, BEOMJOO_shipkey),
    PANBULK : makejson_shipkey (PANBULK_shipname, PANBULK_shipkey),
    WOCEAN : makejson_shipkey (WOCEAN_shipname, WOCEAN_shipkey),
    GFSM : makejson_shipkey (GFSM_shipname, GFSM_shipkey),
    TMS : makejson_shipkey(TMS_shipname, TMS_shipkey),
    SONGA : makejson_shipkey(SONGA_shipname, SONGA_shipkey),
    GLOVIS : makejson_shipkey(GLOVIS_shipname, GLOVIS_shipkey),
    SK_SHIPPING : makejson_shipkey(SK_SHIPPING_shipname, SK_SHIPPING_shipkey),
    PIL : makejson_shipkey (PIL_shipname,PIL_shipkey),
    HOS : makejson_shipkey (HOS_shipname,HOS_shipkey),
    ES_MARITIME : makejson_shipkey (EsMaritime_shipname,EsMaritime_shipkey),
    YOUHA_MARINE : makejson_shipkey (YOUHAMARINE_shipname,YOUHAMARINE_shipkey),
    KLCSM : makejson_shipkey (KLCSM_shipname,KLCSM_shipkey),
    HMM : makejson_shipkey (HMM_shipname,HMM_shipkey),
  };


  const jsonString = JSON.stringify(finalObject, null, 2);

  fs.writeFile('ships_data.json', jsonString)
    .then(() => {
      console.log('JSON file has been saved.');
    })
    .catch((err) => {
      console.error('Error while saving JSON file:', err);
    });