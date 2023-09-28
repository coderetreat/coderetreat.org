const icons = import.meta.glob("./assets/*.svg", { eager: true, as: "url" });
console.log(icons);
export const OPERATING_SYSTEMS = {
  windows: {
    icon: icons["./assets/windows.svg"],
    name: "Windows",
  },
  macosx: {
    icon: icons["./assets/mac.svg"],
    name: "Mac OS X",
  },
};

export const LANGUAGES = {
  ruby: {
    icon: icons["./assets/ruby.svg"],
    name: "Ruby",
  },
  java: {
    icon: icons["./assets/java.svg"],
    name: "Java",
  },
  javascript: {
    icon: icons["./assets/nodejs.svg"],
    name: "JavaScript",
  },
  // python: {
  //   icon: icons["./assets/python.svg"],
  //   name: "Python3",
  // },
  kotlin: {
    icon: icons["./assets/kotlin.svg"],
    name: "Kotlin",
  },
};
