describe('test login page', function() {
/*
	it('should add a todo', function() {
	    	browser.get('http://www.angularjs.org');

	    	element(by.model('todoText')).sendKeys('write a protractor test');
	    	element(by.css('[value="add"]')).click();

	    	var todoList = element.all(by.repeater('todo in todos'));
	    	expect(todoList.count()).toEqual(3);
	    	expect(todoList.get(2).getText()).toEqual('write a protractor test');
	});
*/

	// cookies https://github.com/angular/protractor/issues/341
	it('should have a login form', function(){
		browser.get('http://localhost:8134/app/index.html');

		element(by.model('ctrl.user.email')).sendKeys('testme@gmail.com');
		element(by.model('ctrl.user.password')).sendKeys('letmein');
		element(by.id('btnSignIn')).click();
		
	});
});

describe('test home page', function(){
	it('should have a canvas', function(){
//		browser.manage().addCookie('username', 'testme@gmail.com', '/');
//		browser.get('http://localhost:8134/app/index.html#/home');
//		browser.debugger();

		browser.sleep(5000);
		expect(browser.getCurrentUrl()).toContain('home');
		var cityList = element.all(by.repeater('city in ctrl.cities'));
		expect(cityList.count()).toBeGreaterThan(1);
	});

});
