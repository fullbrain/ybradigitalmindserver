import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { deepParseJson } from "deep-parse-json";




@Injectable()
export class ParseTeamFormDataJSONPipe implements PipeTransform {
    transform(values: any, _metadata: ArgumentMetadata) {

        if( _metadata.type === "body" ){
            const deserializedValues = deepParseJson(values);

            return deserializedValues;
        }else {
            return values;
        }

    }
}