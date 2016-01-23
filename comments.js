var CommentView = require('pages/comment_view'),
  css = require.loadCss({content: __inline('/pages/comments/comments_view.scss')}),
  users = require('globals/filter_data').produce({route: 'user', section: 'name'}),
  KeyCode = require('globals/keycode'),
  template = __inline('/pages/comments/comments_view.html'),

  CommentsView = Marionette.CompositeView.extend({
    className: 'comments-view clearfix',
    template: _.template(template, {variable: 'data'}),
    templateHelpers: function () {
      return {
        commentsNum: this.collection.length,
        showAll: this.getOption('showAll'),
        users: users.pluck('value')
      }
    },
    childView: CommentView,
    childViewContainer: '.comments-container',

    collectionEvents: {
      'add': 'showLoadMoreBtn',
    },

    events: {
      'submit form': 'addComment',
      'click .load-more-btn': 'loadMore',
      'keyup .comment-input': 'hintUsers',
      'click .hint-region li': 'fillInput'
    },

    initialize: function (options) {
      this.options = options;
      this.init();
    },

    init: function () {
      this.hintFired = false;
      this._regExp = '';
    },

    hintUsers: function (e) {
      var $e = $(e)[0];
      if($e.keyCode === 32) { //空格重新触发
        this.init();
        return;
      }
      if($e.keyCode === 50 && $e.shiftKey === true ) { //按下@
        this.init();
        this.$el.parent().css('overflow', 'visible');
        this.$('ul').show();
        this.$('ul > li').each(function() {
          $(this).show();
        });
        this.hintFired = true;
        return;
      }
      if(this.hintFired) { //触发@
        if($e.keyCode === 16) return; //修复shift键bug
        // console.log('hintFired:' + this._regExp);
        // this._regExp = this.createRegExpString($e);
        this.createRegExpString($e);
        this.filtByRegExp(this._regExp);
      }
    },

    createRegExpString: function (e) {
      var $ul = this.$('ul');
      var inputText = this.$('.comment-input').val();

      if (e.keyCode === 8) {
        if (inputText.indexOf('@') !== -1) {
          this._regExp = inputText.substring(inputText.lastIndexOf('@')+1)
        } else {
          $ul.hide();
          this.init();
          return;
        }
      } else {
        this._regExp = this._regExp + KeyCode[(e.which)];
      }

      // this._regExp = this._regExp || '';
      // var regArr = this._regExp.split('');
      // if(e.keyCode === 8) { //回退键
      //   regArr.pop();
      //   if (regArr.length === 0) {
      //     if(this.$('.comment-input').val().indexOf('@') !== -1) {
      //       this.hintFired = true;
      //     } else {
      //       $ul.hide();
      //       this.init();
      //     }
      //     return;
      //   }
      //   // if (this.$('.comment-input').val().indexOf('@') !== -1) {
      //   //   this.hintFired
      //   // }
      // } else {
      //   regArr.push(KeyCode[(e.which)]);
      // }
      // console.log('regStr:'+regArr.join(''));
      // return regArr.join('');

    },

    filtByRegExp: function (_regExp) {
      var regExp = new RegExp(_regExp);
      var $lis = this.$('ul > li');
      $lis.filter(function() {
        return !regExp.test($(this).text());
      }).each(function() {
        $(this).hide();
      });

      $lis.filter(function() {
        return regExp.test($(this).text());
      }).each(function() {
        $(this).show();
      });

    },

    fillInput: function (e) {
      var $commentInput = this.$('.comment-input');
      var inputText = $commentInput.val();
      $commentInput.val(inputText.substring(0,inputText.lastIndexOf('@')+1) + $(e.target).text());
      $commentInput.focus();
      this.$('ul').hide();
    },

    toggleCommentInput: function () {
      this.$('.new-comment-form').toggleClass('show');
      if(this.$('.new-comment-form').hasClass('show')) {
        this.$('.new-comment-form input').focus();
      }
    },

    addComment: function (e) {
      e.preventDefault();

      var comment = this.$('.new-comment-form input').val().trim();
      if (!comment) return;

      this.$('.new-comment-form input').val('');
      this.collection.addComment(comment);
    },

    loadMore: function () {
      this.$('.comments-container').toggleClass('active');
    },

    showLoadMoreBtn: function () {
      if (this.collection.length <= 1) return;

      this.$('.load-more-btn').addClass('active');
    }
  });

module.exports = CommentsView;
