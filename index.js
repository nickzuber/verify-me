'use strict'

var myFullname = 'Nick Zuber'

// Timeline / Feed
var allTweetNodes = document.querySelectorAll('.FullNameGroup'), i
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
profileHeaderCardNode.style.marginLeft = '-5px'
profileHeaderCardNode.className = 'ProfileHeaderCard-badges'

var profileHeaderCardLinkNode = document.createElement('a')
profileHeaderCardLinkNode.href = 'href="/help/verified'


// Connect the DOM nodes
verifiedIconNode.appendChild(hiddenVisuallyNode.cloneNode(true))
userBadgeNode.appendChild(verifiedIconNode.cloneNode(true))

profileHeaderCardLinkNode.appendChild(verifiedIconNode.cloneNode(true))
profileHeaderCardNode.appendChild(profileHeaderCardLinkNode.cloneNode(true))


// Append elements to DOM
try {
  for (i = 0; i < allTweetNodes.length; ++i) {
    if(allTweetNodes[i].querySelector('.fullname').innerHTML === myFullname) {
      allTweetNodes[i].querySelector('.UserBadges').appendChild(userBadgeNode.cloneNode(true))
    }
  }
  document.querySelector('.ProfileHeaderCard-name').appendChild(profileHeaderCardNode.cloneNode(true))
  document.querySelector('.DashboardProfileCard-name .UserBadges').appendChild(verifiedIconNode.cloneNode(true))
} catch (_) {}
