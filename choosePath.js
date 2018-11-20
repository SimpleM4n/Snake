function choosePath(target, pos, head) {

  let count = 0;

  while(count<4) {
    if(pos) {
      if(target[0] > 0) {
        if(nextField("down", head)) return enemy.direction = "down";
        else {
          count++;
          switch(count) {
            case 1:
              pos = 0;
              if(target[1] == 0) {
                target[1] = (bSize/2)-enemy.position[1];
              }
              break;
            case 2:
              if(enemy.direction == "up") {
                target[0] *= -1;
                break;
              }
              pos = 0;
              target[1] *= -1;
              break;
            case 3:
              if(enemy.direction == "up") {
                pos = 0;
                terget[1] *= -1;
                break;
              }
              target[0] *= -1;
              break;
          }
        }
      }else {
        if(nextField("up", head)) return enemy.direction = "up";
        else {
          count++;
          switch(count) {
            case 1:
              pos = 0;
              if(target[1] == 0) {
                target[1] = (bSize/2)-enemy.position[1];
              }
            case 2:
              if(enemy.direction == "down") {
                target[0] *= -1;
                break;
              }
              pos = 0;
              target[1] *= -1;
              break;
            case 3:
              if(enemy.direction == "down") {
                pos = 0;
                target[1] *= -1;
                break;
              }
              target[0] *= -1;
              break;
          }
        }
      }
    }
    if(target[1] > 0) {
      if(nextField("right", head)) return enemy.direction = "right";
      else {
        count++;
        switch(count) {
          case 1:
            pos = 1;
            if(target[0] == 0) {
              target[0] = (bSize/2)-enemy.position[0];
            }
            break;
          case 2:
            if(enemy.direction == "left") {
              target[1] *= -1;
              break;
            }
            pos = 1;
            target[0] *= -1;
            break;
          case 3:
            if(enemy.position == "left") {
              pos = 1;
              target[0] *= -1;
              break;
            }
            target[1] *= -1;
            break;
        }
      }
    }else {
      if(nextField("left", head)) return enemy.direction = "left";
      else {
        count++;
        switch(count) {
          case 1:
            pos = 1;
            if(target[0] == 0) {
              target[0] = (bSize/2)-enemy.position[0];
            }
            break;
          case 2:
            if(enemy.direction == "right") {
              target[1] *= -1;
              break;
            }
            pos = 1;
            target[0] *= -1;
            break;
          case 3:
            if(enemy.direction == "right") {
              pos = 1;
              target[0] *= -1;
              break;
            }
            target[1] *= -1;
            break;
        }
      }
    }
  }
  return null;
}

function nextField(direction, box) {
  switch(direction) {
    case "left":
        if(box.previousSibling == null || box.previousSibling.className[1] != "o") return false;
        return true;
    case "right":
        if(box.nextSibling == null || box.nextSibling.className[1] != "o") return false;
        return true;
    case "up":
        let col = Array.from(box.parentNode.children).indexOf(box);
        if(box.parentNode.previousSibling.nodeType != 1 || box.parentNode.previousSibling.childNodes[col].className[1] != "o") return false;
        return true;
    case "down":
        let col = Array.from(box.parentNode.children).indexOf(box);
        if(box.parentNode.nextSibling == null || box.parentNode.nextSibling.childNodes[col].className[1] != "o") return false;
        return true;
  }
}
