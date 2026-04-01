import type { MailProviderKind, ProviderCredentialShape } from "@mailio/shared";

export type ProviderAdapter = {
  id: MailProviderKind;
  displayName: string;
  authMode: "basic" | "oauth2";
  supportsDeltaSync: boolean;
  supportsPushHints: boolean;
  requiredCredentialFields: string[];
  buildConnectionHealthCheck(credentials: ProviderCredentialShape): {
    safeSummary: string;
    secretRefs: string[];
  };
};

const providerRegistry: ProviderAdapter[] = [
  {
    id: "imap",
    displayName: "Generic IMAP/SMTP",
    authMode: "basic",
    supportsDeltaSync: false,
    supportsPushHints: false,
    requiredCredentialFields: ["encryptedSecretRef", "username", "host", "port", "tls"],
    buildConnectionHealthCheck(credentials) {
      if (credentials.provider !== "imap") {
        throw new Error("Expected IMAP credentials");
      }

      return {
        safeSummary: `${credentials.host}:${credentials.port} (${credentials.tls ? "tls" : "plain"})`,
        secretRefs: [credentials.encryptedSecretRef]
      };
    }
  },
  {
    id: "microsoft365",
    displayName: "Microsoft 365",
    authMode: "oauth2",
    supportsDeltaSync: true,
    supportsPushHints: true,
    requiredCredentialFields: ["encryptedSecretRef", "scopes"],
    buildConnectionHealthCheck(credentials) {
      if (credentials.provider !== "microsoft365") {
        throw new Error("Expected Microsoft 365 credentials");
      }

      return {
        safeSummary: `scopes=${credentials.scopes.length}`,
        secretRefs: [credentials.encryptedSecretRef]
      };
    }
  },
  {
    id: "gmail",
    displayName: "Gmail",
    authMode: "oauth2",
    supportsDeltaSync: true,
    supportsPushHints: true,
    requiredCredentialFields: ["encryptedSecretRef", "scopes"],
    buildConnectionHealthCheck(credentials) {
      if (credentials.provider !== "gmail") {
        throw new Error("Expected Gmail credentials");
      }

      return {
        safeSummary: `scopes=${credentials.scopes.length}`,
        secretRefs: [credentials.encryptedSecretRef]
      };
    }
  }
];

export function createProviderRegistry(): ProviderAdapter[] {
  return [...providerRegistry];
}
