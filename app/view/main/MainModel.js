/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('MyloginApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    data: {
        editdisabled: true,
        deletedisabled: true,
        user: {}
    },
    formulas: {
        currentPerson: {
            bind: {
                /* will bind to the record being selected on the grid */
                bindTo: '{employeeGrid.selection}',
                /* deep bind to be able to update the record */
                deep: true
            },

            get: function (rec) {
                return rec;
            },

        },

        /* returns the record status - dirty and valid */
        recStatus: {
            bind: {
                /* binds to the current record selected in the grid */
                bindTo: '{currentPerson}',
                /* deep bind to be notified on each model change */
                deep: true
            },

            get: function (person) {
                var ret = {
                    dirty: person ? person.dirty : false,
                    valid: person && person.isModel ? person.isValid() : false
                };
                ret.dirtyAndValid = ret.dirty && ret.valid;
                return ret;
            }
        }
    },
    stores: {
        EmployeeStore: {
            model: 'MyloginApp.model.Personnel',
            data: [

            ]
            ,

            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    //    rootProperty: 'items'
                }
            }
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});
