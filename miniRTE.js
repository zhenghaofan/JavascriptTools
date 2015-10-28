(function() {
  jQuery(function() {
    $.miniRTE = function(element, options) {
      var _this = this;
      this.settings = {};
      this.$element = $(element);
      this.getSetting = function(key) {
        return this.settings[key];
      };
      this.callSettingFunction = function(name, args) {
        if (args == null) {
          args = [];
        }
        return this.settings[name].apply(this, args);
      };
      this.init = function() {
        this.settings = $.extend({}, this.defaults, options);
        this.renderToolbar();
        this.renderInlineToolbar();
        this.assignEvents();
        this.enableContentEditableAreas();
        this.execCommand('enableObjectResizing', false);
        return this.execCommand('defaultParagraphSeparator', 'p');
      };
      this.enableContentEditableAreas = function() {
        var _this = this;
        return $(this.settings.editableSelector).each(function(index, el) {
          var $element;
          $element = $(el);
          $element.attr('contentEditable', true);
          $element.on('keydown', _this.keyDownEventHandler);
          $element.on('keyup', _this.keyUpEventHandler);
          $element.on('paste', _this.handlePaste);
          $element.on('focus', _this.focusHandler);
          return $element.children().each(function(index, child) {
            return _this.unwrapDiv(child);
          });
        });
      };
      this.renderToolbar = function() {
        var $buttonEl, $toolbarEl, icon, symbol, title, values, _ref;
        $toolbarEl = $('<ul class="minirte-toolbar"></ul>');
        _ref = this.settings.buttons;
        for (symbol in _ref) {
          values = _ref[symbol];
          title = values.title;
          icon = values.icon;
          $buttonEl = "<li class=\"toolbar-menu-" + symbol + "\">";
          $buttonEl += "<button data-action=\"" + symbol + "\">";
          $buttonEl += title;
          if (icon) {
            $buttonEl += "<span class=\"icon icon-" + icon + "\"></span>";
          }
          $buttonEl += "</button></li>";
          $toolbarEl.append($buttonEl);
        }
        return $($toolbarEl).appendTo(this.$element);
      };
      this.renderInlineToolbar = function() {
        var $inputField;
        $inputField = $('<input name="url-field" placeholder="Type or Paste URL here"/>');
        $inputField.on('keydown', this.updateLinkURL);
        $inputField.on('blur', this.hideInlineToolbar);
        this.$inlineToolbar = $('<div class="minirte-inline-toolbar"><span class="icon icon-link"></span></div>');
        this.$inlineToolbar.append($inputField);
        return this.$inlineToolbar.appendTo($('body'));
      };
      this.assignEvents = function() {
        var _this = this;
        return $('.minirte-toolbar button').on('click', function(event) {
          var action;
          if (!_this.isSelectionEditable()) {
            return;
          }
          if (event.target.tagName === 'SPAN') {
            action = $(event.currentTarget).data('action');
          } else {
            action = $(event.target).data('action');
          }
          if (action === 'quote') {
            return _this.toggleBlockquote();
          } else if (action === 'link') {
            return _this.linkHandling();
          } else if (action === 'heading') {
            return _this.toggleHeading();
          } else if (action === 'insertUnorderedList') {
            return _this.toggleList();
          } else {
            return _this.execCommand(action);
          }
        });
      };
      this.execCommand = function(action, value) {
        if (value == null) {
          value = null;
        }
        return document.execCommand(action, false, value);
      };
      this.keyUpEventHandler = function(event) {
        if (!_this.isSelectionEditable()) {
          return;
        }
        if ($(event.target).children().length === 0 || $(event.target).children()[0].nodeName === 'BR') {
          return _this.execCommand('formatBlock', 'p');
        }
      };
      this.focusHandler = function(event) {
        return _this.fixParagraph(event.target);
      };
      this.fixParagraph = function(element) {
        var $element, contents;
        $element = $(element);
        contents = $element.contents();
        if ($.trim($element.text()) === '' || (contents.length === 1 && contents[0].tagName === 'BR')) {
          _this.moveCaret(element, 0);
          return _this.execCommand('formatBlock', 'p');
        }
      };
      this.unwrapDiv = function(element) {
        _this.moveCaret(element, 0);
        _this.execCommand('formatBlock', 'p');
        if (element.nodeName === 'DIV') {
          return $(element).contents().unwrap();
        }
      };
      this.keyDownEventHandler = function(event) {
        if (event.keyCode === 13) {
          _this.handleReturn(event);
        }
        if (event.ctrlKey || event.metaKey) {
          return _this.handleKeyCommand(event);
        }
      };
      this.toggleBlockquote = function() {
        var selection;
        selection = window.getSelection();
        if ($(selection.anchorNode).closest('blockquote').length > 0) {
          this.execCommand('formatBlock', 'p');
          return this.execCommand('outdent');
        } else {
          return this.execCommand('formatBlock', 'blockquote');
        }
      };
      this.toggleList = function() {
        var selection;
        selection = window.getSelection();
        if ($(selection.anchorNode).closest('li').length > 0) {
          this.execCommand('formatBlock', 'p');
          return this.execCommand('outdent');
        } else {
          return this.execCommand('insertUnorderedList');
        }
      };
      this.toggleHeading = function() {
        var selection;
        selection = window.getSelection();
        if ($(selection.anchorNode).closest('p').length > 0) {
          return this.execCommand('formatBlock', 'h2');
        } else {
          return this.execCommand('formatBlock', 'p');
        }
      };
      this.handleReturn = function(event) {
        var $node, $parentsPrev, $prev, node, parentsPrev, prev, range, selection;
        if (!this.isSelectionEditable()) {
          return event.preventDefault();
        }
        if (event.type === 'keydown') {
          selection = window.getSelection();
          node = selection.anchorNode;
          $node = $(node);
          $prev = $node.prev();
          prev = $node.prev()[0];
          if (node.nodeType === 3 && selection.getRangeAt(0).startOffset > 0) {
            return;
          }
          if ($node.html() === '<br>') {
            if (node.nodeName === 'BLOCKQUOTE' || node.parentNode.nodeName === 'BLOCKQUOTE') {
              document.execCommand('formatBlock', false, 'p');
              document.execCommand('outdent', false, null);
            } else if (node.nodeName === 'LI' || node.parentNode.nodeName === 'LI') {
              document.execCommand('insertUnorderedList', false, null);
              document.execCommand('insertHTML', false, '<p><br></p>');
            } else if ((prev != null ? prev.nodeName : void 0) !== 'HR' && this.settings.hrAfterBreaks) {
              document.execCommand('insertHorizontalRule', false, null);
              document.execCommand('insertHTML', false, '<p><br></p>');
              $('.minirte-editable hr').attr('contentEditable', 'false');
            }
            return event.preventDefault();
          }
          if ($node.parent().prev().html() === '<br>') {
            return event.preventDefault();
          }
          $parentsPrev = $node.parent().prev();
          parentsPrev = $parentsPrev[0];
          if (!this.settings.hrAfterBreaks) {
            return;
          }
          if (parentsPrev && node.nodeType === 3 && selection.getRangeAt(0).startOffset === 0 && $node.parent().html() !== '<br>' && parentsPrev.nodeName === 'P' && $parentsPrev.html() !== '<br>') {
            range = selection.getRangeAt(0);
            document.execCommand('insertHorizontalRule', false, null);
            $('.minirte-editable hr').attr('contentEditable', 'false');
            selection.removeAllRanges();
            selection.addRange(range);
            return event.preventDefault();
          }
          if ((parentsPrev != null) && parentsPrev.nodeName === 'HR') {
            return event.preventDefault();
          }
        }
      };
      this.handleKeyCommand = function(event) {
        if (event.which === 66) {
          return _this.execCommand('bold');
        } else if (event.which === 73) {
          return _this.execCommand('italic');
        }
      };
      this.handlePaste = function(event) {
        var text;
        event.preventDefault();
        text = event.originalEvent.clipboardData.getData("text/plain");
        return document.execCommand("insertHTML", false, text);
      };
      this.linkHandling = function() {
        var range;
        range = window.getSelection().getRangeAt(0);
        if ($(range.commonAncestorContainer).find('a').length > 0) {
          this.$currentLink = $(range.commonAncestorContainer).find('a');
          this.previousURL = this.$currentLink.attr('href');
        } else if (range.commonAncestorContainer.nodeName === 'A') {
          this.$currentLink = $(range.commonAncestorContainer);
          this.previousURL = this.$currentLink.attr('href');
          this.selectElementContents(this.$currentLink);
        } else if (range.commonAncestorContainer.parentElement.nodeName === 'A') {
          this.$currentLink = $(range.commonAncestorContainer.parentElement);
          this.previousURL = this.$currentLink.attr('href');
          this.selectElementContents(this.$currentLink);
        } else if (range.collapsed) {
          return;
        } else {
          this.execCommand('createLink', 'http://');
          this.$currentLink = $(window.getSelection().anchorNode.parentNode);
        }
        this.currentSelection = this.saveSelection(this.$currentLink);
        this.showInlineToolbar();
        return this.enableInputField();
      };
      this.showInlineToolbar = function() {
        var coordinates;
        coordinates = _this.getSelectionCoordinates();
        return _this.$inlineToolbar.css({
          top: coordinates.top,
          left: coordinates.left
        }).show();
      };
      this.hideInlineToolbar = function() {
        var $input;
        if (_this.updatingLink) {
          return;
        }
        $input = _this.$inlineToolbar.find('input');
        $input.val('');
        if (_this.currentSelection) {
          _this.restoreSelection(_this.$currentLink, _this.currentSelection);
          if (_this.previousURL) {
            _this.execCommand('createLink', _this.previousURL);
          } else {
            _this.execCommand('unlink');
          }
          window.getSelection().removeAllRanges();
        }
        _this.$inlineToolbar.hide();
        _this.$currentLink = null;
        _this.previousURL = null;
        return _this.currentSelection = null;
      };
      this.enableInputField = function() {
        var $input, href;
        $input = _this.$inlineToolbar.find('input');
        href = _this.$currentLink.attr('href');
        if (href !== "http://") {
          $input.val(_this.$currentLink.attr('href'));
        }
        return $input.focus();
      };
      this.getUrlFromInputField = function() {
        var $input, link;
        $input = _this.$inlineToolbar.find('input');
        link = $input.val();
        if ((link != null) && link !== '') {
          if (!link.match("^(http|https)://")) {
            return "http://" + link;
          } else {
            return link;
          }
        }
      };
      this.updateLinkURL = function(event) {
        var link;
        if (event.keyCode !== 13) {
          return;
        }
        _this.updatingLink = true;
        event.preventDefault();
        event.stopPropagation();
        if (link = _this.getUrlFromInputField()) {
          _this.restoreSelection(_this.$currentLink, _this.currentSelection);
          _this.execCommand('unlink');
          _this.execCommand('createLink', link);
          _this.currentSelection = null;
        } else {
          _this.$currentLink.contents().unwrap();
        }
        _this.updatingLink = false;
        return _this.hideInlineToolbar();
      };
      this.saveSelection = function(containerEl) {
        var preSelectionRange, range, start;
        if (containerEl instanceof jQuery) {
          containerEl = containerEl[0];
        }
        range = window.getSelection().getRangeAt(0);
        preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        start = preSelectionRange.toString().length;
        return {
          start: start,
          end: start + range.toString().length
        };
      };
      this.restoreSelection = function(containerEl, savedSel) {
        var charIndex, foundStart, i, nextCharIndex, node, nodeStack, range, sel, stop;
        if (containerEl instanceof jQuery) {
          containerEl = containerEl[0];
        }
        charIndex = 0;
        range = document.createRange();
        range.setStart(containerEl, 0);
        range.collapse(true);
        nodeStack = [containerEl];
        node = void 0;
        foundStart = false;
        stop = false;
        while (!stop && (node = nodeStack.pop())) {
          if (node.nodeType === 3) {
            nextCharIndex = charIndex + node.length;
            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
              range.setStart(node, savedSel.start - charIndex);
              foundStart = true;
            }
            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
              range.setEnd(node, savedSel.end - charIndex);
              stop = true;
            }
            charIndex = nextCharIndex;
          } else {
            i = node.childNodes.length;
            while (i--) {
              nodeStack.push(node.childNodes[i]);
            }
          }
        }
        sel = window.getSelection();
        sel.removeAllRanges();
        return sel.addRange(range);
      };
      this.isSelectionEditable = function() {
        var isEditable, selection;
        selection = document.getSelection();
        if (!selection.anchorNode) {
          return false;
        }
        isEditable = $(selection.anchorNode.parentElement).closest("[" + this.settings.dataAttributeFlag + "]").length > 0 || $(selection.anchorNode).attr(this.settings.dataAttributeFlag) === 'true';
        return isEditable;
      };
      this.selectElementContents = function(element) {
        var range, selection;
        if (element instanceof jQuery) {
          element = element[0];
        }
        range = document.createRange();
        range.selectNodeContents(element);
        selection = window.getSelection();
        selection.removeAllRanges();
        return selection.addRange(range);
      };
      this.moveCaret = function(element, start, end) {
        var range, selection, startingNode;
        if (element instanceof jQuery) {
          element = element[0];
        }
        range = document.createRange();
        startingNode = element.childNodes.length > 0 ? element.childNodes[0] : element;
        range.setStart(startingNode, start);
        if (end) {
          range.setEnd(startingNode, end);
        }
        selection = window.getSelection();
        selection.removeAllRanges();
        return selection.addRange(range);
      };
      this.getSelectionCoordinates = function() {
        var boundary, left, range, selection, top;
        selection = window.getSelection();
        range = selection.getRangeAt(0);
        boundary = range.getBoundingClientRect();
        top = boundary.top - 5 + window.pageYOffset + "px";
        left = (boundary.left + boundary.right) / 2 + "px";
        return {
          top: top,
          left: left
        };
      };
      this.init();
      return this;
    };
    $.miniRTE.prototype.defaults = {
      editableSelector: '.minirte-editable',
      dataAttributeFlag: 'data-minirte-enabled',
      buttons: {
        bold: {
          title: 'Bold',
          icon: 'bold'
        },
        italic: {
          title: 'Italic',
          icon: 'italic'
        },
        quote: {
          title: 'Quote',
          icon: 'left-quote'
        },
        insertUnorderedList: {
          title: 'List',
          icon: 'list'
        },
        link: {
          title: 'Link',
          icon: 'link'
        },
        heading: {
          title: 'Heading',
          icon: 'heading'
        }
      }
    };
    return $.fn.miniRTE = function(options) {
      return this.each(function() {
        var plugin;
        if ($(this).data('miniRTE') === void 0) {
          plugin = new $.miniRTE(this, options);
          return $(this).data('miniRTE', plugin);
        }
      });
    };
  });

}).call(this);