import ExpoModulesCore
import SwiftUI
import UIKit

struct VariableBlurSwiftUIWrapper: View {
  let maxBlurRadius: CGFloat
  let tintOpacityTop: Double
  let tintOpacityMiddle: Double

  @Environment(\.colorScheme) private var colorScheme

  var body: some View {
    GeometryReader { geo in
      let height = max(geo.size.height, 1)

      VariableBlurView(
        maxBlurRadius: maxBlurRadius,
        direction: .blurredTopClearBottom,
        startOffset: 0
      )
      .overlay {
        LinearGradient(
          stops: [
            .init(color: fadeTint.opacity(tintOpacityTop), location: 0),
            .init(
              color: fadeTint.opacity(tintOpacityMiddle),
              location: min(90 / height, 1)
            ),
            .init(color: fadeTint.opacity(0), location: 1),
          ],
          startPoint: .top,
          endPoint: .bottom
        )
      }
    }
    .allowsHitTesting(false)
    .background(Color.clear)
  }

  private var fadeTint: Color {
    colorScheme == .dark ? .black : .white
  }
}

final class VariableHeaderBlurView: ExpoView {
  private let blurContainer = UIView()
  private var hostingController: UIHostingController<VariableBlurSwiftUIWrapper>?

  private var headerHeight: CGFloat = 150
  private var maxBlurRadius: CGFloat = 15
  private var tintOpacityTop: Double = 0.4
  private var tintOpacityMiddle: Double = 0.1

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    setup()
  }

  private func setup() {
    backgroundColor = .clear
    clipsToBounds = false

    blurContainer.backgroundColor = .clear
    blurContainer.isUserInteractionEnabled = false
    blurContainer.clipsToBounds = true

    setupBlur()

    // Add ONLY the internal overlay ourselves.
    super.addSubview(blurContainer)
  }

  private func setupBlur() {
    let controller = UIHostingController(rootView: createWrapper())
    controller.view.backgroundColor = .clear
    controller.view.isUserInteractionEnabled = false
    controller.view.clipsToBounds = true

    hostingController = controller
    blurContainer.addSubview(controller.view)
  }

  private func createWrapper() -> VariableBlurSwiftUIWrapper {
    VariableBlurSwiftUIWrapper(
      maxBlurRadius: maxBlurRadius,
      tintOpacityTop: tintOpacityTop,
      tintOpacityMiddle: tintOpacityMiddle
    )
  }

  func setHeaderHeight(_ value: Double) {
    headerHeight = max(CGFloat(value), 0)
    setNeedsLayout()
  }

  func setMaxBlurRadius(_ value: Double) {
    maxBlurRadius = max(CGFloat(value), 0)
    hostingController?.rootView = createWrapper()
  }

  func setTintOpacityTop(_ value: Double) {
    tintOpacityTop = value
    hostingController?.rootView = createWrapper()
  }

  func setTintOpacityMiddle(_ value: Double) {
    tintOpacityMiddle = value
    hostingController?.rootView = createWrapper()
  }

  override func layoutSubviews() {
    super.layoutSubviews()

    blurContainer.frame = CGRect(
      x: 0,
      y: 0,
      width: bounds.width,
      height: min(headerHeight, bounds.height)
    )

    hostingController?.view.frame = blurContainer.bounds

    // Keep our blur overlay above RN children.
    bringSubviewToFront(blurContainer)
  }

  override func didAddSubview(_ subview: UIView) {
    super.didAddSubview(subview)

    // RN may add children after our blur overlay.
    // Always bring blur back to the front.
    if subview !== blurContainer {
      bringSubviewToFront(blurContainer)
    }
  }
}