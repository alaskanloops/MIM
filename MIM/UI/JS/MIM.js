﻿$(function () {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.mIMHub;
    // Create a function that the hub can call back to display messages.
    chat.client.addNewMessageToPage = function (message) {
        // Add the message to the page.
        $('#discussion').append("<p>" + htmlEncode(message) + "</p>");
    };


    var name = "";
    var sex = "male"
    var selectedClass = "Mage"
    var strength = 0;
    var dexterity = 0;
    var constitution = 0;
    var wisdom = 0;
    var intelligence = 0;
    var charisma = 0;

    chat.client.createCharacter = function () {
        name = prompt("Please enter your name", "Malleus");



    }

    chat.client.setStats = function (stats) {
        console.log("stats " + stats[0]);

        strength = stats[0];
        dexterity = stats[1];
        constitution = stats[2];
        wisdom = stats[3];
        intelligence = stats[4];
        charisma = stats[5];
        prompt("str: " + strength + " dex:" + dexterity + " con:" + constitution + " wis:" + wisdom + " int:" + intelligence + " cha:" + charisma + " Are you hapy with these stats?");

        chat.server.loadRoom();


    }

    // Set initial focus to message input box.
    $('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        chat.server.welcome();

        chat.client.createCharacter();

        var stats = chat.server.getStats();

        if (stats) {
            console.log("stats " + stats[0])
        }


        $('#sendmessage').click(function () {

            chat.server.charSetup(name, sex, selectedClass, strength, dexterity, constitution, wisdom, intelligence, charisma);
            // Call the Send method on the hub.
            chat.server.recieveFromClient($('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
    });
});
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}