function TodoItem(id, caption, isCompleted) {
  this.id = id;
  this.caption = caption;
  this.isCompleted = isCompleted;
}

function AppModel() {
  this.input = "";
  this.todoCollection = [];

  //add the new item in TODO
  this.addTodo = function(caption, isCompleted) {
    var self = this;
    $.ajax({
      type: "POST",
      url: "server/insert.php",
      data: {
        caption: caption,
        isCompleted: isCompleted
      },
      success: function(data) {
        var res = JSON.parse(data);
        var log = res.data;
        self.todoCollection.push(
          new TodoItem(log["id"], log["caption"], log["isCompleted"])
        );
      },
      error: function(data) {
        alert(data);
      }
    });
  };

  //remove the element from TODO
  this.removeTodo = function(id, i) {
    var self = this;
    $.ajax({
      type: "POST",
      url: "server/delete.php",
      data: {
        id: id
      },
      success: function(data) {
        self.todoCollection.splice(i, 1);
      }
    });
  };

  //edit the element From TODO
  this.updateTodo = function(id, new_caption, i) {
    var self = this;
    $.ajax({
      type: "POST",
      url: "server/edit.php",
      data: {
        id: id,
        caption: new_caption
      },
      success: function(data) {
        self.todoCollection[i].caption = new_caption;
      }
    });
  };

  //toggle the isCompelete status from TODO
  this.toggle = function(id, i) {
    var self = this;
    $.ajax({
      type: "POST",
      url: "server/edit.php",
      data: {
        id: id,
        caption: null
      },
      success: function(data) {
        var val = self.todoCollection[i].isCompleted;
        if (val == 0) {
          self.todoCollection[i].isCompleted = 1;
        } else {
          self.todoCollection[i].isCompleted = 0;
        }
      }
    });
  };

  //show all the data from TODO
  this.showTodo = function() {
    var self = this;
    $.ajax({
      url: "server/get.php",
      data: {
        filter: "all"
      },
      success: function(result) {
        var log = JSON.stringify(result.data);
        self.todoCollection = JSON.parse(log);
        console.log(self.todoCollection);
      }
    });
  };

  this.showCompletedTodo = function() {
    var self = this;
    $.ajax({
      url: "server/get.php",
      data: {
        filter: "completed"
      },
      success: function(result) {
        var log = JSON.stringify(result.data);
        self.todoCollection = JSON.parse(log);
        console.log(self.todoCollection);
      }
    });
  };

  this.showIncompletedTodo = function() {
    var self = this;
    $.ajax({
      url: "server/get.php",
      data: {
        filter: "incompleted"
      },
      success: function(result) {
        var log = JSON.stringify(result.data);
        self.todoCollection = JSON.parse(log);
        console.log(self.todoCollection);
      }
    });
  };
}