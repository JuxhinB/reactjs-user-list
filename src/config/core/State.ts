class MainInfo {
  public storage: any = null;

  constructor() {
    this.storage = this.checkStorageType();
  }
  // Test if local storage is possible to use
  checkStorageType = () => {
    let st = null;
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      st = localStorage;
    } catch (e) {
      st = sessionStorage;
    }
    return st;
  };

  setUserToken = (arg: string) => {
    this.storage.setItem("token", arg);
  };

  getUserToken = () => {
    this.storage.getItem("token");
  };

  deleteUserToken = () => {
    this.storage.removeItem("token");
  };

  checkAuth = () => {
    try {
      let token = this.storage.getItem("token");
      if (token != null) {
        return token;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
}

let Core = new MainInfo();

export default Core;
