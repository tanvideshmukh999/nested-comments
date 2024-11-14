const commentsList = [{
    id: 1,
    userName: 'Tanvi',
    commentText: 'Hello This is Tanvi Deshmukh',
    
    replies: [{
      id: 2,
      userName: 'Rudra',
      commentText: 'This is the project using html,css,javascript',
    }]
  },
  {
    id: 6,
    userName: 'Samarthaa',
    commentText: 'This is second Comment',
    replies: [],
  },
  {
    id: 3,
    userName: 'Aaryan',
    commentText: 'Third is third Comment',
    replies: [
    ]
  }
];





document.addEventListener('DOMContentLoaded',function(){
    const commentsContainer=document.querySelector(".comments-container");
    let currentReplyComment=null;
    let currentPostBtn=null;
    let currentCancelBtn=null;
    let currentEditComment=null;
    let currePostEditComment=null;
    let lastId=getUniqueID();
    function getUniqueID() {
        let maxID = 0;
        commentsList.forEach(comment => {
          if (comment.id > maxID) {
            maxID = comment.id;
          }
          if (comment.replies) {
            comment.replies.forEach(reply => {
              if (reply.id > maxID) {
                maxID = reply.id;
              }
            });
          }
        });
        return maxID + 1;
      }

      // const resetButton=document.createElement('button');
      // resetButton.textContent='Reset'
      // resetButton.classList.add('reset-btn');
      // commentsContainer.appendChild(resetButton);

   
    function loadUI(){
        commentsContainer.innerHTML="";
     commentsList.forEach(comment =>{
        addComment(commentsContainer,comment);
     })
    }

function addComment(parentContainer ,comment){
    const commentDiv=document.createElement('div');
    commentDiv.id=comment.id;
    commentDiv.classList.add('comment');
    const parentCommentDiv=document.createElement('div');
    parentCommentDiv.classList.add('parent-comment');
    commentDiv.appendChild(parentCommentDiv);
   

    const replies=document.createElement('div');
    replies.classList.add('replies');
    commentDiv.appendChild(replies);
    

    const avtar=document.createElement('img');
    avtar.src="https://t3.ftcdn.net/jpg/04/85/67/08/360_F_485670810_kCPqkWudAgcVpt8vIRiH95tBrxT33RwN.jpg";
    avtar.alter="user-profile";
    avtar.classList.add('avtar');
    parentCommentDiv.appendChild(avtar);


    const commentDetails=document.createElement('div');
    commentDetails.classList.add('comment-details');
    parentCommentDiv.appendChild(commentDetails);

    const nameElement=document.createElement('h4');
    nameElement.classList.add('user-name');
    nameElement.textContent=comment.userName;
    commentDetails.appendChild(nameElement);

    const commentTextNode=document.createElement('p');
    commentTextNode.classList.add('comment-text');
    commentTextNode.textContent=comment.commentText;
    commentDetails.appendChild(commentTextNode);

    const commentActions=document.createElement('div');
    commentActions.classList.add('comment-action');
    commentDetails.appendChild(commentActions);

    const replyBtn=document.createElement('button');
    replyBtn.classList.add('reply-btn');
    replyBtn.textContent='Reply';
    replyBtn.addEventListener("click",function(){
        handleReply(commentDiv);

    });
    commentActions.appendChild(replyBtn);

    const editBtn=document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent='Edit';
    editBtn.addEventListener("click",function(){
        handleEdit(commentDiv);
    });
    commentActions.appendChild(editBtn);

    const deleteBtn=document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent='Delete';
    deleteBtn.addEventListener("click",function(){
        handleDelete(commentDiv);
    });
    commentActions.appendChild(deleteBtn);

    if(comment && comment.replies && comment.replies.length > 0){
        comment.replies.forEach(reply => {
            addComment(replies,reply);
        })
           
        
    }

    parentContainer.appendChild(commentDiv);
}
  function updateCommentsList(commentId,commentText){
    const Processing=(list)=>{
        list.forEach(comment =>{
            if(comment.id==commentId){
                if(!comment.replies) comment.replies=[];
                comment.replies.push({
                    id: lastId++,
                    userName: 'New User',
                    commentText:commentText,
                })
            }
            if( comment.replies && comment.replies.length >0){
                Processing(comment.replies);
            }
        })

    }
    Processing(commentsList);
  }

function handleReply(commentDiv){

      if(currentReplyComment){
        currentReplyComment.parentNode.removeChild(currentReplyComment);
        currentPostBtn.parentNode.removeChild(currentPostBtn);
        currentCancelBtn.parentNode.removeChild(currentCancelBtn);
      }

    
      

    const replyInput=document.createElement('input');
    replyInput.type="text";
    replyInput.placeholder="Enter your reply..";
    replyInput.classList.add('reply-input');
   


    const postBtn=document.createElement('button');
    postBtn.classList.add('post-btn');
    postBtn.textContent="Post";
    postBtn.addEventListener("click",function (){
        const inputText=replyInput.value.trim();
        if(inputText !==""){
            updateCommentsList(commentDiv.id,inputText);
            replyInput.parentNode.removeChild(postBtn);
            currentReplyComment=null;
            currentPostBtn=null;
            currentCancelBtn=null;
            loadUI();
        }
    });
  

    const cancelBtn=document.createElement('button');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.textContent="Cancel";
    cancelBtn.addEventListener("click",function (){});
  

    commentDiv.querySelector('.comment-details').appendChild(replyInput);
    commentDiv.querySelector('.comment-details').appendChild(postBtn);
    commentDiv.querySelector('.comment-details').appendChild(cancelBtn);

    currentReplyComment=replyInput;
    currentPostBtn=postBtn;
    currentCancelBtn=cancelBtn;


}
function removeByCommentId(commentId){
    const Processing=(list)=>{
        list.forEach((comment ,index) =>{
            if(comment.id==commentId){
               
                list.splice(index,1);

            }
            if( comment.replies && comment.replies.length >0){
                Processing(comment.replies);
            }
        })

    }
    Processing(commentsList);
}

function handleDelete(commentDiv){
    removeByCommentId(parseInt(commentDiv.id));
    loadUI();
}


function editCommentsList(commentId,commentText){
    const Processing=(list)=>{
        list.forEach(comment=>{
            if(comment.id==commentId){
               
               comment.commentText=commentText;

            }
            if( comment.replies && comment.replies.length >0){
                Processing(comment.replies);
            }
        })

    }
    Processing(commentsList);
}

function handleEdit(commentDiv){
    if (currentEditComment) {
        currentEditComment.parentNode.removeChild(currentCancelBtn);
        currePostEditComment.parentNode.removeChild(currePostEditComment);
      }
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = commentDiv.querySelector('.comment-text').textContent;
      editInput.placeholder = 'Enter your new input...';
      editInput.classList.add('edit-input');

      const postBtn = document.createElement('button');
      postBtn.textContent = 'Post';
      postBtn.classList.add('edit-button');
      postBtn.addEventListener('click', function() {
        const newCommentText = editInput.value.trim();
        if (newCommentText !== '') {
          editCommentsList(commentDiv.id, newCommentText);
          editInput.parentNode.removeChild(editInput);
          postBtn.parentNode.removeChild(postBtn);
          currentEditComment = null;
          currePostEditComment = null;
          loadUI();
        }
      });

      commentDiv.querySelector('.comment-details').appendChild(editInput);
      commentDiv.querySelector('.comment-details').appendChild(postBtn);
      currentEditComment = editInput;
      currePostEditComment = postBtn;
}


    loadUI();
})