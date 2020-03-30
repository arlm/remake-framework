export default function initAutoGeneratedComponents () {
  let htmlString = `
  <style>
    /* editable components */
    [data-i-editable-off] #remake__auto-generated, 
    [data-user-is-not-page-author] #remake__auto-generated {
      display: none;
    }

    .remake-edit {
      display: none;
      position: absolute;
      box-sizing: border-box;
      font-family: inherit;
    }

    .remake-edit * {
      box-sizing: border-box;
    }

    [data-switched-on~="remakeEdit"], [data-switched-on~="remakeEditWithoutRemove"], [data-switched-on~="remakeEditWithHide"] {
      display: block;
    }

    .remake-edit__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9;
    }

    .remake-edit__edit-container {
      position: absolute;
      z-index: 10;
      min-width: 280px;
      width: 100%;
    }

    .remake-edit__edit-area {
      margin-bottom: 8px;
    }

    .remake-edit__textarea, .remake-edit__input {
      display: block;
      width: 100%;
      padding: 7px 14px 9px;
      font-size: 18px;
      border: none;
      outline: none;
      line-height: 1.4em;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
    }

    .remake-edit__textarea {
      min-height: 48px;
      resize: none;
    }

    .remake-edit__buttons {
      display: flex;
    }

    .remake-edit__button {
      display: inline-block;
      margin: 0 8px 0 0;
      padding: 7px 14px 9px;
      border: 0;
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
 Helvetica, Arial, sans-serif,
 "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      font-size: 18px;
      color: #fff !important;
      background-color: #228be6;
      line-height: 1em;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
    }

    .remake-edit__button:last-child {
      margin: 0;
    }

    .remake-edit__button:hover {
      background-color: #0b6cbf;
      color: #fff;
      text-decoration: none;
    }

    .remake-edit__button--remove, .remake-edit__button--hide {
      background-color: #e03131;
    }

    .remake-edit__button--hide {
      display: none;
    }

    .remake-edit__button--remove:hover, .remake-edit__button--hide:hover {
      background-color: #b42626;
      color: #fff;
    }

    [data-switched-on~="remakeEditWithoutRemove"] .remake-edit__button--remove, [data-switched-on~="remakeEditWithHide"] .remake-edit__button--remove {
      display: none;
    }

    [data-switched-on~="remakeEditWithHide"] .remake-edit__button--hide {
      display: inline-block;
    }

    .remake-edit__button--cancel {
      margin-left: auto;
      background-color: #868E96;
    }

    .remake-edit__button--cancel:hover {
      background-color: #64707d;
      color: #fff;
    }

    /* upload components */
    .uploading-notice {
      display: none;
      z-index: 9;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      width: 240px;
      padding: 14px 19px 18px 18px;
      font-weight: bold;
      font-size: 16px;
      color: #2B292D;
      background-color: #fff;
      border-radius: 7px;
      box-shadow: 0px 2px 6px rgba(0,0,0,.24);
    }

    .uploading-notice.uploading-notice--visible {
      display: block;
    }

    .uploading-notice__status {
      display: flex;
      margin-bottom: 12px;
    }

    .uploading-notice__status-text {
    }

    .uploading-notice__status-percentage {
      margin-left: auto;
      color: #4C6EF5;
    }

    .uploading-notice__progress-bar {
      overflow: hidden;
      background-color: #DBE4FF;
      height: 16px;
      border-radius: 3px;
    }

    .uploading-notice__progress-bar-complete {
      height: 100%;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform .2s;
      background-color: #4C6EF5;
    }

  </style>
  <div id="remake__auto-generated" data-o-ignore>

    <!-- editable components -->
    <form 
      class="remake-edit" 

      data-i-sync
      data-switches="remakeEdit(no-auto) remakeEditWithoutRemove(no-auto) remakeEditWithHide(no-auto)"

      data-o-type="object"
    >
      <div 
        class="remake-edit__backdrop"
        data-switch-actions="remakeEdit(off) remakeEditWithoutRemove(off) remakeEditWithHide(off)"
      ></div>
      <div class="remake-edit__edit-container">
        <div class="remake-edit__edit-areas">
        </div>
        <div class="remake-edit__buttons">
          <a 
            class="remake-edit__button remake-edit__button--remove" 
            href="#"
            data-i-remove
            data-switch-actions="remakeEdit(off) remakeEditWithoutRemove(off) remakeEditWithHide(off)"
          >remove</a>
          <a 
            class="remake-edit__button remake-edit__button--hide" 
            href="#"
            data-i-hide
            data-switch-actions="remakeEdit(off) remakeEditWithoutRemove(off) remakeEditWithHide(off)"
          >remove</a>
          <a 
            class="remake-edit__button remake-edit__button--cancel" 
            href="#"
            data-switch-actions="remakeEdit(off) remakeEditWithoutRemove(off) remakeEditWithHide(off)"
          >cancel</a>
          <button 
            class="remake-edit__button remake-edit__button--save" 
            type="submit"
            data-switch-actions="remakeEdit(off) remakeEditWithoutRemove(off) remakeEditWithHide(off)"
          >save</button>
        </div>
      </div>
    </form>

    <!-- upload components -->
    <div class="uploading-notice">
      <div class="uploading-notice__status">
        <div class="uploading-notice__status-text">Uploading</div>
        <div class="uploading-notice__status-percentage"></div>
      </div>
      <div class="uploading-notice__progress-bar">
        <div class="uploading-notice__progress-bar-complete"></div>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("beforeend", htmlString);
}