Ext.define('MyloginApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function () {
        localStorage.setItem("TutorialLoggedIn", true);
        var me = this,
            formValues = this.lookupReference('loginform').getValues();
        firebase.auth().signInWithEmailAndPassword(formValues.email, formValues.password).then(function (result) {
            me.showUserGrid();
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });

    },
    onGooglePlus: function (btn) {
        var me = this;
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            me.showUserGrid();
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert(errorMessage)
            // ...
        });
    },
    showUserGrid: function () {
        Ext.create({
            xtype: 'app-main'
        });
        this.getView().close()
    },
    onSignUp: function (btn) {
        var me = this,
            formValues = this.lookupReference('loginform').getValues();
        firebase.auth().createUserWithEmailAndPassword(formValues.email, formValues.password).then(function () {
            me.showUserGrid();
            // Sign-out successful.
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
    }
})