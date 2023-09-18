Feature: User Authentication tests

Background:
Given User navigates to the application
And User clicks on the Login link

Scenario: Login should be un-successful
And User enters the username as "abou@gmail.com"
When User clicks on the Continue with Email button
Then Login should fail

Scenario: Login should be un-successfull
When User clicks on the Continue with Email button
Then Error message should displayed

Scenario: Login should be successful
And User enters the username as "aboubakkarbhatti@gmail.com"
When User clicks on the Continue with Email button
And User enters the password as "Apex@@Bytes-ai-8174"
And User clicks on the login button
Then Login should success


