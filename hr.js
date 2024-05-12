const puppeteer=require('puppeteer')

const codeObj=require('./codes')

const loginLink='https://wwww.hackerrank.com/auth/login'
const email='30318csaiml@gmail.com'
const password='Anushka@1111'


let browserOpen= puppeteer.launch({
    headless: false,

    args :['--start-maximized'],

    defaultViewport:null
})
let page

browserOpen.then(function(browserObj){
    let browserOpenPromise= browserObj.newPage()
    return browserOpenPromise;
}) .then(function(newTab){
    page = newTab
    let hackerRankOpenPromise =newTab.goto(loginLink)
    return hackerRankOpenPromise;
}).then(function(){
    let emailIsEntered=page.type("input[type='text']", email, {delay : 50} );
    return emailIsEntered;
}).then(function(){
    let passwordisEntered=page.type("input[type='password']", password, {delay : 50} );
    return passwordisEntered;
}).then(function(){
    let loginButtonClicked=page.click('button[type="button"]' , {delay :50});
    return loginButtonClicked;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]' , page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick("input[value='warmup']" , page);
    return getToWarmUp;
})
// .then(function(){
//     let waitfor3Seconds= page.waitForTimeout(3000)
//     return waitfor3Seconds
// })
.then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay :50}) 
    return allChallengesPromise
}).then(function(questionArr){
    console.log('number of questions' , questionArr.length)
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answers[0])
    return questionWillBeSolved
})


function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModel = cPage.click(selector);
        return clickModel;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver( page,question, answer ){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise = waitAndClick('.hr-monaco-base-editor',page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput' ,page)
        }).then(function(){
            return page.type('textarea.custominput', answer, {delay:10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A',{delay:100})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X',{delay:100})
            return XisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.hr-monaco-base-editor',page)
            return mainEditorInFocus 
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A',{delay:100})
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V',{delay:100})
            return VisPressed
        }).then(function(){
            let CtrlIsUnpressed = page.keyboard.up('Control')
            return CtrlIsUnpressed
        }).then(function(){
            return page.click('.hr-monaco-submit', {delay:50})
        })
        .then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}



// function waitAndClick(selector, cPage) {monaco-editor.no-user-select.showUnused.showDeprecated.vs
//     return new Promise(function (resolve, reject) {hr-monaco__run-code
//       let waitForModelPromise = cPage.waitForSelector(selector);
//       waitForModelPromise
//         .then(function () {
//           let clickModel = cPage.click(selector);
//           return clickModel;
//         })
//         .then(function () {
//           resolve();
//         })
//         .catch(function (err) {
//           reject();
//         });
//     });
//   }
  
