CollectionHelpersEntities = {};

var SELF_ENTITY_MARKER = "->";// Todo give users a way to override this

var EntitiesContext = function () {
    this.entities = {};
}

EntitiesContext.prototype.registerEntity = function (entityName, entity) {
    if (this.entities[entityName]) {
        throw new Error("Cannot register entity " + entityName + ". It already exists");
    }
    else {
        this.entities[entityName] = entity;
    }
};
EntitiesContext.prototype.registerEntityHelper = function (entityName, helperName, helper) {
    var entity = this.getEntity(entityName);
    if (entity[helperName]) {
        throw new Error("Cannot add helper " + helperName + " to entity " + entityName + " it's already defined.");
    }
    entity[helperName] = helper;
};
EntitiesContext.prototype.getEntity = function (entityName) {
    if (!this.entities[entityName]) {
        throw new Error("Entity " + entityName + " not found!");
    }
    else {
        return this.entities[entityName];
    }
};
EntitiesContext.prototype.getEntityHelper = function (entityName, helperName) {
    if (!this.entities[name]) {
        throw new Error("Entity " + name + " not found!");
    }
    if (!this.entities[name][helperName]) {
        throw new Error("Helper " + helperName + " was not found on " + entityName + " entity!");
    }
    return this.entities[name][helperName];
};

function addHelperPaths(helperPaths, inputPath, entity) {
    helperPaths = helperPaths || {};
    for (var prop in entity) {
        if (!entity.hasOwnProperty(prop)) {
            continue;
        }
        var path = inputPath ? inputPath + "." + prop : prop;
        if (helperPaths[path]) {
            throw new Error("Cannot add path " + path + "to entity. It already exists");
        }
        helperPaths[path] = entity[prop];
    }
    return helperPaths;
}

function resolveHelperPaths(entitiesContext, pathEntityNameMap) {
    var helperMap = {};
    for (var inputPath in pathEntityNameMap) {
        var entity = entitiesContext.getEntity(pathEntityNameMap[inputPath]);
        if (inputPath.indexOf(SELF_ENTITY_MARKER) === 0) {
            addHelperPaths(helperMap, null, entity);
        }
        else {
            addHelperPaths(helperMap, inputPath, entity);
        }
    }
    return helperMap;
}

function registerHelpersOnCollection(collection, entitiesContext, pathEntityNameMap) {
    collection.helpers(resolveHelperPaths(entitiesContext, pathEntityNameMap));
}

CollectionHelpersEntities.EntitiesContext = EntitiesContext;
CollectionHelpersEntities.addHelperPaths = addHelperPaths;
CollectionHelpersEntities.resolveHelperPaths = resolveHelperPaths;
CollectionHelpersEntities.registerHelpersOnCollection = registerHelpersOnCollection;


