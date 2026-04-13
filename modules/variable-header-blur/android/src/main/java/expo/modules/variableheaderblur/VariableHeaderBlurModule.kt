package expo.modules.variableheaderblur

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class VariableHeaderBlurModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("VariableHeaderBlur")

    View(VariableHeaderBlurView::class) {
      Prop("headerHeight") { view: VariableHeaderBlurView, value: Double ->
        view.setHeaderHeight(value)
      }

      Prop("maxBlurRadius") { view: VariableHeaderBlurView, value: Double ->
        view.setMaxBlurRadius(value)
      }

      Prop("tintOpacityTop") { view: VariableHeaderBlurView, value: Double ->
        view.setTintOpacityTop(value)
      }

      Prop("tintOpacityMiddle") { view: VariableHeaderBlurView, value: Double ->
        view.setTintOpacityMiddle(value)
      }

      Prop("tintColor") { view: VariableHeaderBlurView, value: String? ->
        view.setTintColor(value)
      }

      Prop("progressiveStartY") { view: VariableHeaderBlurView, value: Double ->
        view.setProgressiveStartY(value)
      }

      Prop("progressiveEndY") { view: VariableHeaderBlurView, value: Double ->
        view.setProgressiveEndY(value)
      }
    }
  }
}