import {Realm, createRealmContext} from '@realm/react';

class Equipment extends Realm.Object { }

Equipment.schema = {
    name: "Equipment",
    properties: {
        e_id: "string",
        e_oid: "string",
        e_name: "string",
    },
    primaryKey: "e_id",
};

const config = {
    schema: [Equipment],
};

export default createRealmContext(config);
