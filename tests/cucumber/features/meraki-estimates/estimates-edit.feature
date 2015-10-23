Feature: Estimate Edit

	As a user
	I want to edit an estimate
	So that I can calculate the inversion and monthly totals

	Background:
		Given a user has created an Estimate with name "Test Estimate"

	Scenario: User sees estimate
	  Given I have created an estimate
	  When I navigate to it
	  Then I see its heading containing its name "Test Estimate"

	Scenario: User wants to add products
	  Given I have navigated to my estimate
	  When I click on "Agregar Productos"
	  Then I should see a modal pop
		
	Scenario: User sees a list of products on a modal
		Given I have clicked on "Agregar Productos"
		When the modal pops
		Then I should see a list of products

	Scenario: Empty selected product list
		Given I have not selected any product
		When I click on the selected products button
		Then I should see an empty list
		And I should see an information panel informing me on that fact

	Scenario: Return to the products list
		Given I am looking to an empty selected product list
		When I click on the selected button
		Then I should see a list of products

	Scenario: User selects a product on a modal
	  Given I can see a list of products on a modal
	  When I click to add a product
	  Then it shold be added to the selected products list 
