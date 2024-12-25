import { OpenApiV3_1 } from '@samchon/openapi';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

function isReference(schema: any): schema is OpenApiV3_1.IJsonSchema.IReference {
  return typeof schema === 'object' && schema !== null && '$ref' in schema;
}

function isBaseSchema(schema: any): schema is OpenApiV3_1.IJsonSchema.__ISignificant<string> {
  return typeof schema === 'object' && schema !== null;
}

interface SchemaType {
  type?: string | string[];
  items?: SchemaType;
  properties?: Record<string, SchemaType>;
  required?: string[];
  description?: string;
  format?: string;
  enum?: string[];
  const?: unknown;
  $ref?: string;
  anyOf?: SchemaType[];
  oneOf?: SchemaType[];
}

class SwaggerParser {
  private static readonly HTTP_METHODS: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch'];

  private static normalizeType(type?: any): string | string[] | undefined {
    if (!type) return undefined;
    if (Array.isArray(type)) {
      return type.filter((t): t is string => typeof t === 'string');
    }
    return typeof type === 'string' ? type : undefined;
  }

  private static normalizeEnum(enumValues?: unknown[]): string[] | undefined {
    if (!Array.isArray(enumValues)) return undefined;
    return enumValues.filter((e): e is string => typeof e === 'string');
  }

  private static convertProperties(
    properties?: Record<string, any>
  ): Record<string, SchemaType> | undefined {
    if (!properties || typeof properties !== 'object') return undefined;

    const result: Record<string, SchemaType> = {};
    for (const [key, value] of Object.entries(properties)) {
      const converted = SwaggerParser.convertToSchemaType(value);
      if (converted) {
        result[key] = converted;
      }
    }
    return Object.keys(result).length > 0 ? result : undefined;
  }

  static convertToSchemaType(schema?: OpenApiV3_1.IJsonSchema | OpenApiV3_1.IJsonSchema.IReference): SchemaType | undefined {
    if (!schema || typeof schema !== 'object') return undefined;

    try {
      const result: SchemaType = {};

      if (isReference(schema)) {
        result.$ref = schema.$ref;
        return result;
      }

      if (isBaseSchema(schema)) {
        if ('type' in schema) {
          result.type = this.normalizeType(schema.type);
        }

        if ('items' in schema) {
          const items = Array.isArray(schema.items) ? schema.items[0] : schema.items;
          result.items = this.convertToSchemaType(items);
        }

        if ('properties' in schema && schema.properties) {
          result.properties = this.convertProperties(schema.properties);
        }

        if ('required' in schema && Array.isArray(schema.required)) {
          result.required = schema.required;
        }

        if ('description' in schema) {
          result.description = schema.description;
        }

        if ('format' in schema) {
          result.format = schema.format;
        }

        if ('enum' in schema) {
          result.enum = this.normalizeEnum(schema.enum);
        }
      }

      return Object.keys(result).length > 0 ? result : undefined;

    } catch (error) {
      console.error('Schema conversion error:', error);
      return undefined;
    }
  }

  static extractSchemaType(schema: SchemaType): string {
    if (schema.$ref) return schema.$ref.split('/').pop() || 'unknown';
    if (!schema.type) return 'unknown';

    const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

    switch (type) {
      case 'array':
        return schema.items ? `${this.extractSchemaType(schema.items)}[]` : 'unknown[]';
      case 'object':
        if (!schema.properties) return 'object';
        const props = Object.entries(schema.properties)
          .map(([key, prop]) => `${key}: ${this.extractSchemaType(prop)}`)
          .join(', ');
        return `{ ${props} }`;
      default:
        return type;
    }
  }
}

export const convertToSchemaType = SwaggerParser.convertToSchemaType;
export const extractSchemaType = SwaggerParser.extractSchemaType;