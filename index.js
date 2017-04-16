'use strict';

const
    NymiApi = require('./src/helpers/NymiApi'),
    Utils = require('./src/helpers/Utils');

module.exports = {
    Events: {
        BaseEvent: require('./src/events/BaseEvent'),
        Pattern: require('./src/events/PatternEvent'),
        Provisioned: require('./src/events/ProvisionedEvent'),
        GeneralError: require('./src/events/GeneralErrorEvent'),
        FoundChange: require('./src/events/FoundChangeEvent'),
        PresenceChange: require('./src/events/PresenceChangeEvent'),
        RoamingAuthNonce: require('./src/events/RoamingAuthNonceEvent')
    },
    Responses: {
        Totp: require('./src/responses/TotpResponse'),
        Info: require('./src/responses/InfoResponse'),
        Init: require('./src/responses/InitResponse'),
        Random: require('./src/responses/RandomResponse'),
        CdfAuth: require('./src/responses/CdfAuthResponse'),
        BaseResponse: require('./src/responses/BaseResponse'),
        KeyDelete: require('./src/responses/KeyDeleteResponse'),
        Signature: require('./src/responses/SignatureResponse'),
        Acknowledge: require('./src/responses/AcknowledgeResponse'),
        Notification: require('./src/responses/NotificationResponse'),
        SymmetricKey: require('./src/responses/SymmetricKeyResponse'),
        RoamingAuthSig: require('./src/responses/RoamingAuthSigResponse'),
        CdfRegistration: require('./src/responses/CdfRegistrationResponse'),
        RoamingAuthSetup: require('./src/responses/RoamingAuthSetupResponse'),
        ProvisionsChanged: require('./src/responses/ProvisionsChangedResponse')
    },
    Models: {
        KeyType: require('./src/models/KeyTypeInfo'),
        NapiInit: require('./src/models/NapiInitInfo'),
        NymiBand: require('./src/models/NymiBandInfo'),
        Provision: require('./src/models/ProvisionInfo'),
        NapiConfig: require('./src/models/NapiConfigInfo'),
        Notification: require('./src/models/NotificationInfo')
    },
    RoamingAuth: {
        sign: Utils.signMessage,
        verify: Utils.verifySignature,
        getPublicKey: Utils.getPublicKey,
        generatePem: Utils.genRoamingAuthPem
    },
    Utils: {
        tryCatch: Utils.tryCatch,
        hasAccess: Utils.hasAccess,
        patternToInt: Utils.patternToInt,
        intToPattern: Utils.intToPattern
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
    Nea: require('./src/helpers/Nea'),
    Request: require('./src/helpers/NeaRequest'),
    NeaConfig: require('./src/helpers/NeaConfig'),
    Response: require('./src/helpers/NeaResponse'),
    NymiApiWorker: require('./src/helpers/NapiWorker'),
    RequestFactory: require('./src/helpers/NeaRequestFactory'),
    ResponseFactory: require('./src/helpers/NeaResponseFactory')
};