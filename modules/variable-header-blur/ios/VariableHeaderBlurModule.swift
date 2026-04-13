import ExpoModulesCore

public class VariableHeaderBlurModule: Module {
  public func definition() -> ModuleDefinition {
    Name("VariableHeaderBlur")

    View(VariableHeaderBlurView.self) {
      Prop("headerHeight") { (view: VariableHeaderBlurView, value: Double) in
        view.setHeaderHeight(value)
      }
      Prop("maxBlurRadius") { (view: VariableHeaderBlurView, value: Double) in
        view.setMaxBlurRadius(value)
      }
      Prop("tintOpacityTop") { (view: VariableHeaderBlurView, value: Double) in
        view.setTintOpacityTop(value)
      }
      Prop("tintOpacityMiddle") { (view: VariableHeaderBlurView, value: Double) in
        view.setTintOpacityMiddle(value)
      }
    }
  }
}