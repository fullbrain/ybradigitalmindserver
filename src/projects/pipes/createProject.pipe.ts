import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { deepParseJson } from "deep-parse-json";
import { CreateProjectDto } from "../dto";


type TParseProjectFormDataJSONPipe = {
    except?: string[]
}

export class ParseProjectFormDataJSONPipe implements PipeTransform{
    constructor(private except?: TParseProjectFormDataJSONPipe ){}

    transform(values: CreateProjectDto, metadata: ArgumentMetadata) {

        if( metadata.type === "body" ){
            const deserializedValue = deepParseJson(values); 

            values.user_id = Number(values.user_id)
            values.customer_id = Number(values.customer_id);
    

            return deserializedValue;
        } else if (metadata.type === "param") {
            return Number(values);
        } else {
            return values;
        }

    }

}