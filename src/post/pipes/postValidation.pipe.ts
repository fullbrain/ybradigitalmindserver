import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { deepParseJson } from 'deep-parse-json';
import _ from 'lodash';

type TParseFormDataJsonOptions = {
  except?: string[];
};

export class ParseFormDataJsonPipe implements PipeTransform {
  constructor(private options?: TParseFormDataJsonOptions) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    if( _metadata.type === "body" ){
        if( typeof value === "object" ){
            console.log("METADATA: ", _metadata)
            const except = this?.options?.except;
            const serializedValue = value;
            const originProperties = {};
            if (except?.length) {
              _.merge(originProperties, _.pick(serializedValue, ...except));
            }
            const deserializedValue = deepParseJson(value);
            return deserializedValue;
        } else {
            return Number(value);
        }
    } else {
        return value;
    }
  }
}