$(function() {
    describe('RSS Feeds', () => { // This group of tests is to test features on the RSS Feeds

        it('are defined', () => { // Expect for the variable allFeeds to be defined and to no be empty
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('urls are defined', () => { // Expect for every element of allFeeds to have a defined and non-empty URL.
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        it('names are defined', () => { // Expect for every element of allFeeds to have a defined and non-empty name.
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    describe('The menu', () => { // This group of test is to test the functionality of the side menu
        var menuIcon = $('.menu-icon-link');

        it('menu starts hidden', () => { // Expect that the side menu is hidden on application load.
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('menu appears on click', () => { // Expect that clicking the menu icon reveals the side menu and clicking it again hides it
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            menuIcon.click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

    });

    describe('Initial Entries', () => { // This group of tests checks how many entries appear on load

        beforeEach((done) => { // Loads the feed and tests run when the callback function in loadFeed runs done()
            loadFeed(0, done);
        });

        it('there is at least one element in the .feed container', () => { // Expect that there is content in the feed
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', () => {
        var oldContent;
        var newContent;

        beforeEach((done) => { // loads content from one feed saves it in a variable, loads content from another feed and saves that into a different variable
            loadFeed(0, () => {
                oldContent = $('.feed').text();
                loadFeed(1, () => {
                    newContent = $('.feed').text();
                    done();
                });
            });
        });

        it('loads new content', () => { // Expect that loading new content removes the old content. 
            expect(newContent).not.toBe(oldContent);
        });
    });
}());
