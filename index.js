'use strict';

const
    Nea = require('./src/helpers/Nea'),
    NymiApi = require('./src/helpers/NymiApi'),
    BaseEvent = require('./src/events/BaseEvent'),
    NeaConfig = require('./src/helpers/NeaConfig'),
    NeaRequest = require('./src/helpers/NeaRequest'),
    KeyTypeInfo = require('./src/models/KeyTypeInfo'),
    NeaResponse = require('./src/helpers/NeaResponse'),
    PatternEvent = require('./src/events/PatternEvent'),
    NapiInitInfo = require('./src/models/NapiInitInfo'),
    NymiBandInfo = require('./src/models/NymiBandInfo'),
    ProvisionInfo = require('./src/models/ProvisionInfo'),
    TotpResponse = require('./src/responses/TotpResponse'),
    InfoResponse = require('./src/responses/InfoResponse'),
    InitResponse = require('./src/responses/InitResponse'),
    BaseResponse = require('./src/responses/BaseResponse'),
    NapiConfigInfo = require('./src/models/NapiConfigInfo'),
    RandomResponse = require('./src/responses/RandomResponse'),
    FoundChangeEvent = require('./src/events/FoundChangeEvent'),
    ProvisionedEvent = require('./src/events/ProvisionedEvent'),
    NotificationInfo = require('./src/models/NotificationInfo'),
    CdfAuthResponse = require('./src/responses/CdfAuthResponse'),
    GeneralErrorEvent = require('./src/events/GeneralErrorEvent'),
    NeaRequestFactory = require('./src/helpers/NeaRequestFactory'),
    SignatureResponse = require('./src/responses/SignatureResponse'),
    KeyDeleteResponse = require('./src/responses/KeyDeleteResponse'),
    NeaResponseFactory = require('./src/helpers/NeaResponseFactory'),
    PresenceChangeEvent = require('./src/events/PresenceChangeEvent'),
    AcknowledgeResponse = require('./src/responses/AcknowledgeResponse'),
    RoamingAuthNonceEvent = require('./src/events/RoamingAuthNonceEvent'),
    NotificationResponse = require('./src/responses/NotificationResponse'),
    SymmetricKeyResponse = require('./src/responses/SymmetricKeyResponse'),
    RoamingAuthSigResponse = require('./src/responses/RoamingAuthSigResponse'),
    CdfRegistrationResponse = require('./src/responses/CdfRegistrationResponse'),
    RoamingAuthSetupResponse = require('./src/responses/RoamingAuthSetupResponse'),
    ProvisionsChangedResponse = require('./src/responses/ProvisionsChangedResponse'),
    Utils = require('./src/helpers/Utils'),
    sign = Utils.signMessage,
    tryCatch = Utils.tryCatch,
    hasAccess = Utils.hasAccess,
    verify = Utils.verifySignature,
    patternToInt = Utils.patternToInt,
    getPublicKey = Utils.getPublicKey,
    intToPattern = Utils.intToPattern,
    generatePem = Utils.genRoamingAuthPem;

const NeaHelpers = {
    Events: {
        BaseEvent: BaseEvent,
        Pattern: PatternEvent,
        Provisioned: ProvisionedEvent,
        FoundChange: FoundChangeEvent,
        GeneralError: GeneralErrorEvent,
        PresenceChange: PresenceChangeEvent,
        RoamingAuthNonce: RoamingAuthNonceEvent
    },
    Responses: {
        Totp: TotpResponse,
        Info: InfoResponse,
        Init: InitResponse,
        Random: RandomResponse,
        CdfAuth: CdfAuthResponse,
        BaseResponse: BaseResponse,
        KeyDelete: KeyDeleteResponse,
        Signature: SignatureResponse,
        Acknowledge: AcknowledgeResponse,
        Notification: NotificationResponse,
        SymmetricKey: SymmetricKeyResponse,
        RoamingAuthSig: RoamingAuthSigResponse,
        CdfRegistration: CdfRegistrationResponse,
        RoamingAuthSetup: RoamingAuthSetupResponse,
        ProvisionsChanged: ProvisionsChangedResponse
    },
    Models: {
        KeyType: KeyTypeInfo,
        NapiInit: NapiInitInfo,
        NymiBand: NymiBandInfo,
        Provision: ProvisionInfo,
        NapiConfig: NapiConfigInfo,
        Notification: NotificationInfo
    },
    RoamingAuth: {
        sign: sign,
        verify: verify,
        getPublicKey: getPublicKey,
        generatePem: generatePem
    },
    Utils: {
        tryCatch: tryCatch,
        hasAccess: hasAccess,
        patternToInt: patternToInt,
        intToPattern: intToPattern
    },
    Const: {
        KeyType: NymiApi.KeyType,
        LogLevel: NymiApi.LogLevel,
        FoundState: NymiApi.FoundState,
        PresenceState: NymiApi.PresenceState,
        PatternAction: NymiApi.PatternAction,
        ProximityState: NymiApi.ProximityState,
        HapticNotification: NymiApi.HapticNotification,
        SignatureAlgorithm: NymiApi.SignatureAlgorithm
    },
    Nea: Nea,
    Request: NeaRequest,
    NeaConfig: NeaConfig,
    Response: NeaResponse,
    RequestFactory: NeaRequestFactory,
    ResponseFactory: NeaResponseFactory
};

module.exports = NeaHelpers;