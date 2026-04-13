package expo.modules.variableheaderblur

import android.content.Context
import android.graphics.Color as AndroidColor
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import dev.chrisbanes.haze.HazeProgressive
import dev.chrisbanes.haze.HazeState
import dev.chrisbanes.haze.HazeTint
import dev.chrisbanes.haze.hazeEffect
import dev.chrisbanes.haze.hazeSource
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class VariableHeaderBlurView(
  context: Context,
  appContext: AppContext
) : ExpoView(context, appContext) {

  private val hazeState = HazeState()

  private var headerHeightPx by mutableFloatStateOf(dpToPx(140f))
  private var maxBlurRadiusDp by mutableFloatStateOf(16f)
  private var tintOpacityTop by mutableFloatStateOf(0.30f)
  private var tintOpacityMiddle by mutableFloatStateOf(0.10f)
  private var tintColor by mutableStateOf(Color.White)

  // New progressive props
  private var progressiveStartY by mutableFloatStateOf(0f)
  private var progressiveEndY by mutableFloatStateOf(dpToPx(140f))

  private val contentWrapper = FrameLayout(context).apply {
    layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT
    )
    clipChildren = false
    clipToPadding = false
  }

  private val composeView = ComposeView(context).apply {
    layoutParams = ViewGroup.LayoutParams(
      ViewGroup.LayoutParams.MATCH_PARENT,
      ViewGroup.LayoutParams.MATCH_PARENT
    )
    isClickable = false
    isFocusable = false
    isFocusableInTouchMode = false

    setContent {
      BlurContent()
    }
  }

  init {
    super.addView(composeView)
  }

  fun setHeaderHeight(value: Double) {
    headerHeightPx = value.toFloat().coerceAtLeast(0f)

    // keep endY in sync by default only if user didn't customize it
    if (progressiveEndY <= 0f || progressiveEndY ==  dpToPx(140f)) {
      progressiveEndY = headerHeightPx
    }

    updateContent()
    requestLayout()
  }

  fun setMaxBlurRadius(value: Double) {
    maxBlurRadiusDp = value.toFloat().coerceAtLeast(0f)
    updateContent()
  }

  fun setTintOpacityTop(value: Double) {
    tintOpacityTop = value.toFloat().coerceIn(0f, 1f)
    updateContent()
  }

  fun setTintOpacityMiddle(value: Double) {
    tintOpacityMiddle = value.toFloat().coerceIn(0f, 1f)
    updateContent()
  }

  fun setTintColor(value: String?) {
    tintColor = parseColorOrDefault(value)
    updateContent()
  }

  fun setProgressiveStartY(value: Double) {
    progressiveStartY = value.toFloat()
    updateContent()
  }

  fun setProgressiveEndY(value: Double) {
    progressiveEndY = value.toFloat()
    updateContent()
  }

  private fun updateContent() {
    composeView.setContent {
      BlurContent()
    }
  }

  @Composable
  private fun BlurContent() {
    Box(modifier = Modifier.fillMaxSize()) {
      AndroidView(
        factory = { contentWrapper },
        modifier = Modifier
          .fillMaxSize()
          .hazeSource(state = hazeState)
      )

      Box(
        modifier = Modifier
          .fillMaxSize()
          .hazeEffect(state = hazeState) {
            blurRadius = maxBlurRadiusDp.dp
            tints = listOf(
              HazeTint(tintColor.copy(alpha = tintOpacityTop))
            )
            progressive = HazeProgressive.verticalGradient(
              startIntensity = 1f,
              endIntensity = 0f,
              startY = progressiveStartY,
              endY = progressiveEndY
            )
          }
      )

      Canvas(modifier = Modifier.fillMaxSize()) {
        drawRect(
          brush = Brush.verticalGradient(
            colors = listOf(
              tintColor.copy(alpha = tintOpacityTop),
              tintColor.copy(alpha = tintOpacityMiddle),
              tintColor.copy(alpha = 0f)
            ),
            startY = progressiveStartY,
            endY = if (progressiveEndY > progressiveStartY) {
              progressiveEndY
            } else {
              size.height
            }
          )
        )
      }
    }
  }

  override fun addView(child: View?, index: Int) {
    if (child == null) return

    if (child === composeView) {
      super.addView(child, index)
    } else {
      val parent = child.parent as? ViewGroup
      parent?.removeView(child)

      contentWrapper.addView(
        child,
        ViewGroup.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT
        )
      )
    }
  }

  private fun dpToPx(dp: Float): Float {
    return dp * resources.displayMetrics.density
  }

  private fun parseColorOrDefault(value: String?): Color {
    if (value.isNullOrBlank()) return Color.White

    return try {
      val parsed = AndroidColor.parseColor(value)
      Color(
        red = AndroidColor.red(parsed),
        green = AndroidColor.green(parsed),
        blue = AndroidColor.blue(parsed),
        alpha = AndroidColor.alpha(parsed)
      )
    } catch (_: IllegalArgumentException) {
      Color.White
    }
  }
}