// Share checkbox
checkbox = document.getElementsByTagName('os-slider')[0].getElementsByClassName('ng-pristine ng-untouched ng-valid ng-empty')[0];
checkboxContainer = document.getElementsByTagName('os-slider')[0];
shareLabel = document.querySelectorAll('[ng-if="ShareController.sharedDocument.acl.sharedWithSupport === false"]')[0];

checkboxContainer.onclick = function() {
  if (checkbox.checked) {
    checkbox.checked = false;
    shareLabel.innerHTML = "Share with Onshape support";
  } else {
    checkbox.checked = true;
    shareLabel.innerHTML = "This document is shared with Onshape support";
  }
}

// Individuals tab: Link document checkbox disables export checkboxes
linkCheckbox = document.querySelectorAll('[data-permission="LINK"]')[0];
exportCheckbox = document.querySelectorAll('[data-permission="EXPORT"]')[0];
exportText = exportCheckbox.parentElement;

linkCheckbox.onclick = function() {
  if (linkCheckbox.checked) {
    exportCheckbox.checked = true;
    exportCheckbox.disabled = true;
    exportText.style = "color: #a0abb4;";
  } else {
    exportCheckbox.checked = false;
    exportCheckbox.disabled = false;
    exportText.style = "color: #333333;";
  }
}

// Teams tab: Link document checkbox disables export checkboxes
teamsLinkCheckbox = document.querySelectorAll('[data-permission="LINK"]')[1];
teamsExportCheckbox = document.querySelectorAll('[data-permission="EXPORT"]')[1];
teamsExportText = teamsExportCheckbox.parentElement;

teamsLinkCheckbox.onclick = function() {
  if (teamsLinkCheckbox.checked) {
    teamsExportCheckbox.checked = true;
    teamsExportCheckbox.disabled = true;
    teamsExportText.style = "color: #a0abb4;";
  } else {
    teamsExportCheckbox.checked = false;
    teamsExportCheckbox.disabled = false;
    teamsExportText.style = "color: #333333;";
  }
}

// Individuals tab: Hide "Can view" notice and disable Share checkbox
notice = document.getElementsByClassName('section-row viewer-help-message')[0];
dropdown = document.getElementsByClassName('os-permission form-control ng-valid ng-not-empty ng-dirty ng-touched')[0];
shareCheckbox = document.querySelectorAll('[data-permission="RESHARE"]')[0];
shareText = shareCheckbox.parentElement;

dropdown.onclick = function() {
  if (dropdown.value == "WRITE") {
    notice.style.display = "none";
    shareCheckbox.disabled = false;
    shareText.style = "color: #333333;";
  } else {
    notice.style.display = "flex";
    shareCheckbox.disabled = true;
    shareText.style = "color: #a0abb4;";
  }
}

// Teams tab: Hide "Can view" notice and disable Share and delete checkboxes
teamsNotice = document.getElementsByClassName('section-row viewer-help-message')[1];
teamsDropdown = document.getElementsByClassName('os-permission form-control ng-pristine ng-untouched ng-valid ng-not-empty')[0];
teamsShareCheckbox = document.querySelectorAll('[data-permission="RESHARE"]')[1];
teamsShareText = teamsShareCheckbox.parentElement;
teamsDeleteCheckbox = document.querySelectorAll('[data-permission="DELETE"]')[1];
teamsDeleteText = teamsDeleteCheckbox.parentElement;

teamsDropdown.onclick = function() {
  if (teamsDropdown.value == "WRITE") {
    teamsNotice.style.display = "none";
    teamsShareCheckbox.disabled = false;
    teamsShareText.style = "color: #333333;";
    teamsDeleteCheckbox.disabled = false;
    teamsDeleteText.style = "color: #333333";
  } else {
    teamsNotice.style.display = "flex";
    teamsShareCheckbox.disabled = true;
    teamsShareText.style = "color: #a0abb4;";
    teamsDeleteCheckbox.disabled = true;
    teamsDeleteText.style = "color: #a0abb4";
  }
}

// Switch share tabs on click
// tabBar = document.getElementsByClassName('os-tab-container')[0];
individualTabButton = document.querySelectorAll('[ng-click="shareAreaController.selectTab(shareAreaController.shareTypes.INDIVIDUAL)"]')[0];
publicTabButton = document.querySelectorAll('[ng-click="shareAreaController.selectTab(shareAreaController.shareTypes.PUBLIC)"]')[0];
teamsTabButton = document.querySelectorAll('[ng-click="shareAreaController.selectTab(shareAreaController.shareTypes.APPLICATION)"]')[0];
linkTabButton = document.querySelectorAll('[ng-click="shareAreaController.selectTab(shareAreaController.shareTypes.LINK)"]')[0];

individualTabContent = document.querySelectorAll('[ng-show="shareAreaController.isTabSelected(shareAreaController.shareTypes.INDIVIDUAL, shareAreaController.shareTypes.TEAM, shareAreaController.shareTypes.COMPANY) || (shareAreaController.isTabSelected(shareAreaController.shareTypes.GUESTS) && shareAreaController.canInviteGuests() && shareAreaController.availableSeats > 0)"]')[0];
publicTabContent = document.querySelectorAll('[ng-if="shareAreaController.isTabSelected(shareAreaController.shareTypes.PUBLIC)"]')[0];
teamsTabContent = document.querySelectorAll('[ng-show="shareAreaController.isTabSelected(shareAreaController.shareTypes.INDIVIDUAL, shareAreaController.shareTypes.TEAM, shareAreaController.shareTypes.COMPANY) || (shareAreaController.isTabSelected(shareAreaController.shareTypes.GUESTS) && shareAreaController.canInviteGuests() && shareAreaController.availableSeats > 0)"]')[1];
linkTabContent = document.querySelectorAll('[ng-if="shareAreaController.isTabSelected(shareAreaController.shareTypes.LINK)"]')[0];
linkTabContentShared = document.querySelectorAll('[ng-if="shareAreaController.isTabSelected(shareAreaController.shareTypes.LINK)"]')[1];

individualTabButton.onclick = function() {
  individualTabButton.classList.add("os-tab--active");
  publicTabButton.classList.remove("os-tab--active");
  teamsTabButton.classList.remove("os-tab--active");
  linkTabButton.classList.remove("os-tab--active");

  individualTabContent.style.display = "flex";
  publicTabContent.style.display = "none";
  teamsTabContent.style.display = "none";
  linkTabContent.style.display = "none";
  linkTabContentShared.style.display = "none";
}

publicTabButton.onclick = function() {
  individualTabButton.classList.remove("os-tab--active");
  publicTabButton.classList.add("os-tab--active");
  teamsTabButton.classList.remove("os-tab--active");
  linkTabButton.classList.remove("os-tab--active");

  individualTabContent.style.display = "none";
  publicTabContent.style.display = "flex";
  teamsTabContent.style.display = "none";
  linkTabContent.style.display = "none";
  linkTabContentShared.style.display = "none";
}

teamsTabButton.onclick = function() {
  individualTabButton.classList.remove("os-tab--active");
  publicTabButton.classList.remove("os-tab--active");
  teamsTabButton.classList.add("os-tab--active");
  linkTabButton.classList.remove("os-tab--active");

  individualTabContent.style.display = "none";
  publicTabContent.style.display = "none";
  teamsTabContent.style.display = "flex";
  linkTabContent.style.display = "none";
  linkTabContentShared.style.display = "none";
}

linkTabButton.onclick = function() {
  individualTabButton.classList.remove("os-tab--active");
  publicTabButton.classList.remove("os-tab--active");
  teamsTabButton.classList.remove("os-tab--active");
  linkTabButton.classList.add("os-tab--active");

  individualTabContent.style.display = "none";
  publicTabContent.style.display = "none";
  teamsTabContent.style.display = "none";
  if (closedLinkPanel.style.display == "none" && expandedLinkPanel.style.display == "none") {
    linkTabContent.style.display = "flex";
    linkTabContentShared.style.display = "none";
  } else {
    linkTabContent.style.display = "none";
    linkTabContentShared.style.display = "flex";
  }

}

// Allow editing of "Anyone with link" section
closedLinkPanel = document.getElementsByClassName("acl-row link")[0];
expandedLinkPanel = document.getElementsByClassName("acl-row editing")[0];
pencil = document.getElementsByClassName("edit-button glyphicon glyphicon-pencil")[0];
updateButton = document.querySelectorAll('[ng-if="acl.newMajorPermission.permission !== OWNER"]')[0];
cancelButton = document.getElementsByClassName("btn button-cancel")[0];
expandedLinkPanelExportCheckbox = document.querySelectorAll('[ng-change="acl.onMinorPermissionChanged(minorPermission)"]')[0];

expandedLinkPanelExportCheckbox.onclick = function() {
  updateButton.disabled = false;
}

pencil.onclick = function() {
  if (exportPermissionField.innerText == "Export") {
    expandedLinkPanelExportCheckbox.checked = true;
  } else {
    expandedLinkPanelExportCheckbox.checked = false;
  }
  closedLinkPanel.style.display = "none";
  updateButton.disabled = true;
  expandedLinkPanel.style.display = "block";
}

cancelButton.onclick = function() {
  expandedLinkPanelExportCheckbox.checked = false;
  closedLinkPanel.style.display = "block";
  expandedLinkPanel.style.display = "none";
}

updateButton.onclick = function() {
  if (expandedLinkPanelExportCheckbox.checked) {
    exportPermissionField.innerText = "Export";
  } else {
    exportPermissionField.innerText = "";
  }

  closedLinkPanel.style.display = "block";
  expandedLinkPanel.style.display = "none";
}

// Enable Public tab when Public is removed, and remove "All Onshape users" from QLV
publicX = document.getElementsByClassName('x-button')[0];
public = document.getElementsByClassName('acl-row public')[0];
publicWarning = document.getElementsByClassName('smaller-label control-label center')[0];

publicX.onclick = function() {
  public.style.display = "none";
  publicTabButton.style.display = "flex";
  publicTabButton.classList.remove("os-tab--active");
  publicWarning.innerText = "This document is private. Only users listed below can access this document.";

  closedLinkPanel.style.backgroundColor = "transparent";
}

// Enable Public sharing when clicking "Make public" button
makePublicButton = document.getElementsByClassName('btn btn-primary os-share-btn os-public-btn')[0];

makePublicButton.onclick = function() {
  public.style.display = "block";
  publicTabButton.style.display = "none";

  publicWarning.innerText = "This document is public. All Onshape users can access this document.";

  individualTabButton.classList.add("os-tab--active");
  individualTabContent.style.display = "flex";
  publicTabContent.style.display = "none";
  teamsTabContent.style.display = "none";
  linkTabContent.style.display = "none";

  closedLinkPanel.style.backgroundColor = "#fafafa";
}

// Enable link sharing when clicking "Turn on link sharing" button
linkButton = document.getElementsByClassName("btn btn-primary os-share-btn make-link-button")[0];
linkExportCheckbox = document.getElementsByClassName("os-minor-permission ng-pristine ng-untouched ng-valid ng-empty")[0];
linkX = document.getElementsByClassName("x-button")[1];
copyToClipboardButton = document.querySelectorAll('[value="Copy to clipboard"]')[0];
docURLLink = document.getElementById("documentLink");
exportPermissionField = document.getElementsByClassName("os-row os-wrap minor-permissions")[2];

linkButton.onclick = function() {
  linkTabContent.style.display = "none";
  linkTabContentShared.style.display = "flex";
  closedLinkPanel.style.display = "block";

  if(linkExportCheckbox.checked) {
    exportPermissionField.innerText = "Export";
  } else {
    exportPermissionField.innerText = "";
  }
}

copyToClipboardButton.onclick = function() {
  docURLLink.select();
  docURLLink.setSelectionRange(0,99999); // For mobile devices
  document.execCommand("copy");
}

linkX.onclick = function() {
  if (linkTabButton.classList.contains("os-tab--active")) {
    linkTabContent.style.display = "flex";
    linkTabContentShared.style.display = "none";
  }

  closedLinkPanel.style.display = "none";
  linkExportCheckbox.checked = false;
}

// Enable dialog close buttons and reopen button
dialogXButton = document.getElementsByClassName("close share-dialog-close os-pin-right")[0];
dialogCloseButton = document.querySelectorAll('[ng-click="ShareController.cancel()"]')[1];
shareDialog = document.getElementsByClassName("modal share-dialog fade in")[0];
dialogClosedWarning = document.getElementsByClassName("dialog-closed")[0];
reopenButton = document.getElementsByClassName("btn btn-primary reopen")[0];

dialogXButton.onclick = function() {
  shareDialog.style.display = "none";
  dialogClosedWarning.style.display = "block";
}

dialogCloseButton.onclick = function() {
  shareDialog.style.display = "none";
  dialogClosedWarning.style.display = "block";
}

reopenButton.onclick = function() {
  shareDialog.style.display = "block";
  dialogClosedWarning.style.display = "none";
}

// Personal message fields
individualCheckbox = document.getElementsByClassName("os-minor-permission individual")[0];
teamsCheckbox = document.getElementsByClassName("os-minor-permission teams")[0];
individualMessageField = document.getElementsByClassName("form-control custom-message-input ng-pristine ng-untouched ng-valid ng-empty")[0];
teamsMessageField = document.getElementsByClassName("form-control custom-message-input ng-pristine ng-untouched ng-valid ng-empty")[1];

individualCheckbox.onclick = function() {
  if (individualCheckbox.checked) {
    individualMessageField.disabled = false;
  } else {
    individualMessageField.disabled = true;
  }
}

teamsCheckbox.onclick = function() {
  if (teamsCheckbox.checked) {
    teamsMessageField.disabled = false;
  } else {
    teamsMessageField.disabled = true;
  }
}
