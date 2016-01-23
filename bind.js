cancelAllTransactions: function () {
  confirm("Are you sure to cancel all transactions?", this.collection.cancelAllTransactions.bind(this.collection));

  //等效
  confirm("Are you sure to cancel all transactions?", function(){
    this.collection.cancelAllTransactions()
  }.bind(this));

}
