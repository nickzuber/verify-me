'use strict'

var myFullname = 'Nick Zuber'

// Timeline / Feed
var userBadgeNode = document.createElement('span')
userBadgeNode.style.fontSize = '13px'
userBadgeNode.className = 'UserBadges'

var verifiedIconNode = document.createElement('span')
verifiedIconNode.className = 'Icon Icon--verified'

var hiddenVisuallyNode = document.createElement('span')
hiddenVisuallyNode.className = 'u-hiddenVisually'
hiddenVisuallyNode.textContent = 'Verified account'


// Profile Header Card
var profileHeaderCardNode = document.createElement('span')
profileHeaderCardNode.style.marginLeft = '-6px'
profileHeaderCardNode.className = 'ProfileHeaderCard-badges'

var profileHeaderCardLinkNode = document.createElement('a')
profileHeaderCardLinkNode.href = 'href="/help/verified'


// Connect the DOM nodes
verifiedIconNode.appendChild(hiddenVisuallyNode.cloneNode(true))
userBadgeNode.appendChild(verifiedIconNode.cloneNode(true))

profileHeaderCardLinkNode.appendChild(verifiedIconNode.cloneNode(true))
profileHeaderCardNode.appendChild(profileHeaderCardLinkNode.cloneNode(true))

function attempt (fn) {
  try { fn() } catch (_) {}
}

function verify () {
  attempt(() => {
    var allTweetNodes = document.querySelectorAll('.FullNameGroup'), i
    for (i = 0; i < allTweetNodes.length; ++i) {
      if(allTweetNodes[i].querySelector('.fullname').innerHTML === myFullname) {
        if (allTweetNodes[i].querySelector('.UserBadges').children.length === 0) {
          allTweetNodes[i].querySelector('.UserBadges').appendChild(userBadgeNode.cloneNode(true))
        }
      }
    }
  })
  attempt(() => {
    if (document.querySelector('.ProfileHeaderCard-name .ProfileHeaderCard-badges') === null) {
      document.querySelector('.ProfileHeaderCard-name').appendChild(profileHeaderCardNode.cloneNode(true))
    }
  })
  attempt(() => {
    if (document.querySelector('.DashboardProfileCard-name .UserBadges').children.length === 0) {
      document.querySelector('.DashboardProfileCard-name .UserBadges').appendChild(verifiedIconNode.cloneNode(true))
    }
  })
  attempt(() => {
    if (document.querySelector('.ProfileNameTruncated .UserBadges').children.length === 0) {
      let truncatedVerifiedIconNode = verifiedIconNode.cloneNode(true)
      truncatedVerifiedIconNode.style.verticalAlign = 'super'
      document.querySelector('.ProfileNameTruncated .UserBadges').appendChild(truncatedVerifiedIconNode.cloneNode(true))
    }
  })
  attempt(() => {
    if (document.querySelector('.DashUserDropdown-userInfoLink .UserBadges').children.length === 0) {
      let menuVerifiedIconNode = verifiedIconNode.cloneNode(true)
      menuVerifiedIconNode.style.verticalAlign = 'baseline'
      menuVerifiedIconNode.style.marginLeft = '3px'
      menuVerifiedIconNode.style.color = '#1da1f2'
      document.querySelector('.DashUserDropdown-userInfoLink .UserBadges').appendChild(menuVerifiedIconNode.cloneNode(true))
    }
  })
}

// Append elements to DOM
$(function () {
  var createObserver = function (obj, args, callback) {
    const obs = new MutationObserver(function(mutations, observer){
      if(mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
        callback();
      }
    });
    obs.observe(obj, {
      childList: args[0],  // children
      subtree: args[1]     // descendents
    });
    obj.addEventListener('DOMNodeInserted', callback, false);
    obj.addEventListener('DOMNodeRemoved', callback, false);
    return obs;
  };

  // Track the number of attempts
  var attempts = 0;

  var timelineNode = document.querySelector('.stream-items');
  var prevLength = timelineNode.children.length;

  var timelineObserver = {}
  var bodyObserver = {}

  // Attempt to do something
  var attemptToVerify = function () {
    ++attempts;

    try {
      if (timelineNode) {
        console.log('%cverify-me %cVerifying your stuff... mounting observer', 'color: #1dcaff', 'color: #9CAFBE');
        verify();
      }
      var timelineObserver = createObserver(timelineNode, [true, false], function () {
        if (++attempts > 500) throw new Error('something went wrong')
        console.log('%cverify-me %cMore tweets loaded into the timeline, verifying you on those...', 'color: #1dcaff', 'color: #9CAFBE');
        verify();
      });
    } catch (e) {
      verify();
      console.log(`%cverify-me %cUnable to find your timeline DOM node, trying again in ${RETRY_TIMING / 1000} seconds...`, 'color: #1dcaff', 'color: #9CAFBE');
      setTimeout(() => {
        if (attempts < ERROR_BUFFER) {
          attemptToVerify();
        } else {
          console.log(`%cverify-me %cUnable to find your timeline DOM node ${ERROR_BUFFER} times, giving up.`, 'color: #1dcaff', 'color: #9CAFBE');
        }
      }, RETRY_TIMING);
    }
  }

  attemptToVerify();

  var prevBodyUpdate = Date.now()
  var bodyObserver = createObserver(document.querySelector('body'), [true, true], function () {
    if ((Date.now() - prevBodyUpdate) / 1000 > 1) {
      console.log('%cverify-me %cNoticed you changed pages, remounting observers', 'color: #1dcaff', 'color: #9CAFBE');
      prevBodyUpdate = Date.now()
      attemptToVerify();
    }
  })
});
