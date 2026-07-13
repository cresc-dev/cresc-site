# auth.md

This document outlines the authentication and registration process for AI agents interacting with the Cresc API.

## Agent Registration

Cresc supports anonymous agent registration with API keys.

- **Registration URI**: `https://api.cresc.dev/agent/register`
- **Claim URI**: `https://api.cresc.dev/agent/claim`
- **Supported Identity Types**: `["anonymous"]`
- **Supported Credential Types**: `["api_key"]`

## Protected Resource Configuration

The resource server details can be found below:
- **Resource Identifier**: `https://api.cresc.dev/`
- **Authorization Server**: `https://api.cresc.dev/`
- **Supported Scopes**: `["read", "write"]`
- **Bearer Token Methods**: `["header"]` (using `Authorization: Bearer <token>` header)
