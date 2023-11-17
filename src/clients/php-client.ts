import axios from "axios";

const phpClient = async (url : string, method : string, data : any, is_multipart_form_data : boolean = false) : Promise<object> => {
    const responseData : string = await phpRequest(url, method, data, is_multipart_form_data);
    return phpResponseDataParser(responseData);
}

const phpRequest = async (
    url : string,
    method : string,
    data : any,
    is_multipart_form_data : boolean,
) : Promise<string> => {
    if (method === "GET") {
        const response = await axios.get(
            url,
            {
                params: data,
            }
        );
        return response.data as string;
    }
    else if (method === "POST") {
        const formData = new FormData();
        if (is_multipart_form_data) {
            // only accept 1 file
            Object.keys(data).forEach((key) => {
                (key !== "file") && formData.append(key, data[key]);
            });
            const blobFile = new Blob([data.file.buffer]);
            formData.append("rest-file", blobFile, data.file.filename)
        }

        const response = await axios.post(
            url,
            is_multipart_form_data ? formData : data,
            {
                headers: {
                    "Content-Type": is_multipart_form_data ? "multipart/form-data" : "application/json",
                    "X-API-KEY": process.env.PHP_API_KEY
                }
            }
        );
        return response.data as string;
    }
    else {
        throw new Error("Invalid method");
    }
}

const phpResponseDataParser = (data : string) : object => {
    return JSON.parse(data);
}

export default phpClient;