/**
 * This view is an example list of people.
 */
Ext.define('MyloginApp.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'MyloginApp.store.Personnel'
    ],

    title: 'Employee Data',
    reference: 'employeeGrid',
    bind: {
        store: '{EmployeeStore}'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Add',
            handler: 'onAddClick'
        }, {
            text: 'Edit',
            bind: {
                disabled: '{editdisabled}'
            },
            handler: 'onEditWindow'
        }, {
            text: 'Delete',
            bind: {
                disabled: '{deletedisabled}'
            },
            handler: 'onDeleteClick'
        }]
    }],
    selType: 'checkboxmodel',
    selModel: {
        checkOnly: false,
        mode: 'SIMPLE'
    },
    columns: [
        { text: 'Name', dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Gender', dataIndex: 'gender', flex: 1 },
        { text: 'Phone', dataIndex: 'phone', flex: 1 },
        { text: 'Designation', dataIndex: 'designation', flex: 1 },
        { text: 'Place', dataIndex: 'place', flex: 1 },

    ],

    listeners: {
        selectionchange: 'onSelectionChange',
        beforerender: 'onBeforeGridRender'
    }
});
