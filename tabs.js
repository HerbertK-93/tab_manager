// Fetch tabs when popup opens
document.addEventListener('DOMContentLoaded', function() {
    loadTabs();
    document.getElementById('save-session').addEventListener('click', saveSession);
    document.getElementById('close-all-tabs').addEventListener('click', closeAllTabs);
});

// Function to load all open tabs
function loadTabs() {
    chrome.tabs.query({}, function(tabs) {
        const tabsContainer = document.getElementById('tabs-container');
        tabsContainer.innerHTML = '';  // Clear the list before loading
        tabs.forEach((tab) => {
            const li = document.createElement('li');
            li.textContent = tab.title;
            li.addEventListener('click', () => chrome.tabs.update(tab.id, { active: true }));
            tabsContainer.appendChild(li);
        });
    });
}

// Function to save current session (open tabs)
function saveSession() {
    chrome.tabs.query({}, function(tabs) {
        const tabUrls = tabs.map(tab => tab.url);
        chrome.storage.local.set({ savedTabs: tabUrls }, function() {
            alert('Session saved!');
        });
    });
}

// Function to close all tabs
function closeAllTabs() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => chrome.tabs.remove(tab.id));
    });
}
