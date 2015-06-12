Package.describe({
    name: 'stfnbrgh:collection-helpers-entities',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Define collection helpers as entities and place them on your documents',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/stfnbrgh/meteor-collection-helpers-entities.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use("stfnbrgh:nested-collection-helpers@0.0.2");
    api.addFiles('collection-helpers-entities.js');
    api.export("CollectionHelpersEntities");
});
