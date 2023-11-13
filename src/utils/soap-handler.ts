import axios from "axios";
import {XMLBuilder, XMLParser} from "fast-xml-parser";

const xmlOptions = {
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
}

const xmlBuilder = new XMLBuilder(xmlOptions);
const xmlParser = new XMLParser();

const soapHandler = async (url : string, ws_url : string, function_name : string, data : object) : Promise<object> => {
    const responseData : string = await soapRequest(url, ws_url, function_name, data);
    return soapResponseDataParser(responseData);
}

const soapRequest = async (
    url : string,
    ws_url : string,
    function_name : string,
    data : object
) : Promise<string> => {
    const envelope = {
        "?xml": {
            "@_version": "1.0",
            "@_encoding": "utf-8",
        },
        "Envelope": {
            "@_xmlns": "http://schemas.xmlsoap.org/soap/envelope/",
            // "Header": {},
            "Body": {
                [function_name]: {
                    "@_xmlns": ws_url,
                    ...soapRequestDataBuilder(data),
                }
            },
            }
        }

    const xmlRequest : string = xmlBuilder.build(envelope) as string;
    const response = await axios.post(
        url,
        xmlRequest,
        {
            headers: {
                "Content-Type": "text/xml",
                "SOAPAction": "#POST",
                Accept: "*/*",
            },
    });
    return response.data as string;
}

const soapRequestDataBuilder = (data : object) : object => {
    const soapData = {}
    for (const [key, value ] of Object.entries(data)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        soapData[key] = {
            "@_xmlns": "",
            "#text": value,
        }
    }
    return soapData;
}

const soapResponseDataParser = (data : string) : object => {

    const parsedData = xmlParser.parse(data);
    const parsedBody = parsedData["S:Envelope"]["S:Body"] || parsedData["soap:Envelope"]["soap:Body"];
    return parsedBody[Object.keys(parsedBody)[0]];
}

export { soapHandler }