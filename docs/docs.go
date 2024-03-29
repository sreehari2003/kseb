// Code generated by swaggo/swag. DO NOT EDIT.

package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "MIT",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/issue": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "summary": "Returns A Single Issue With Post_id",
                "responses": {}
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Create Electricty Issue",
                "parameters": [
                    {
                        "description": "Example Request Body",
                        "name": "reqBody",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.Issue"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/issue/:id": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "summary": "Returns A Single Issue With id",
                "responses": {}
            }
        },
        "/officials": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Check whether user exist in database or not by supertokens primary key",
                "responses": {}
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "summary": "Create KSEB Employee",
                "parameters": [
                    {
                        "description": "Example Request Body",
                        "name": "reqBody",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.Officials"
                        }
                    }
                ],
                "responses": {}
            }
        }
    },
    "definitions": {
        "models.Issue": {
            "type": "object"
        },
        "models.Officials": {
            "type": "object"
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8000",
	BasePath:         "/api/v1",
	Schemes:          []string{"http"},
	Title:            "KSEB Web Server",
	Description:      "Provide Info About KSEB Web Server].",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
