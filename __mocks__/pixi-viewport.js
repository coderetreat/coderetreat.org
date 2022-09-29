module.exports = {
  Viewport: jest.fn().mockImplementation((args) => {
    const _this = {
      ...args,
      worldScreenWidth: args.screenWidth,
      worldScreenHeight: args.screenHeight,
      left: 0,
      top: 0,
      addChild: jest.fn(),
      pause: jest.fn(() => _this),
      drag: jest.fn(() => _this),
      pinch: jest.fn(() => _this),
      wheel: jest.fn(() => _this),
      decelerate: jest.fn(() => _this),
      resize: jest.fn(),
    };
    return _this;
  }),
};
