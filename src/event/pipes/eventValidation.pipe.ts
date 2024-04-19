import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { deepParseJson } from "deep-parse-json";
import _ from "lodash";

type TParseEventFormDataJSONPipe = {
    except: string[];
}

export class ParseEventFormDataJSONPipe implements PipeTransform{
    constructor(private options?: TParseEventFormDataJSONPipe ){}

    transform(value: any, _metadata: ArgumentMetadata){
        if( _metadata.type === "body" ){
            const except = this?.options?.except;
            const serializedValue = value;
            const originProperties = {};
    
            if( except?.length ){
                _.merge(originProperties, _.pick(serializedValue, ...except))
            }
            const deserializedValue = deepParseJson(value);
    
        
            return deserializedValue;
        } else {
            return value;
        }

    }

}