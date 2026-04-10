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
            .init(color: fadeTint.opacity(tintOpacityMiddle), location: min(90 / height, 1)),
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
  private let contentView = UIView()

  private var hostingController: UIHostingController<VariableBlurSwiftUIWrapper>?

  private var isSettingUpInternalViews = false

  private var maxBlurRadius: CGFloat = 15
  private var tintOpacityTop: Double = 0.4
  private var tintOpacityMiddle: Double = 0.1

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    setup()
  }

  private func setup() {
    backgroundColor = .clear
    clipsToBounds = true

    blurContainer.backgroundColor = .clear
    blurContainer.isUserInteractionEnabled = false

    contentView.backgroundColor = .clear
    contentView.isUserInteractionEnabled = true

    isSettingUpInternalViews = true
    super.addSubview(blurContainer)
    super.addSubview(contentView)
    isSettingUpInternalViews = false

    setupBlur()
  }

  private func setupBlur() {
    let controller = UIHostingController(rootView: createWrapper())
    controller.view.backgroundColor = .clear
    controller.view.isUserInteractionEnabled = false

    hostingController = controller

    isSettingUpInternalViews = true
    blurContainer.addSubview(controller.view)
    isSettingUpInternalViews = false
  }

  private func createWrapper() -> VariableBlurSwiftUIWrapper {
    VariableBlurSwiftUIWrapper(
      maxBlurRadius: maxBlurRadius,
      tintOpacityTop: tintOpacityTop,
      tintOpacityMiddle: tintOpacityMiddle
    )
  }

  private func updateUI() {
    hostingController?.rootView = createWrapper()
    setNeedsLayout()
  }

  override func layoutSubviews() {
    super.layoutSubviews()

    blurContainer.frame = bounds
    contentView.frame = bounds
    hostingController?.view.frame = blurContainer.bounds

    bringSubviewToFront(contentView)
  }

  // MARK: - Prop setters

  func setMaxBlurRadius(_ radius: Double) {
    maxBlurRadius = CGFloat(radius)
    updateUI()
  }

  func setTintOpacityTop(_ value: Double) {
    tintOpacityTop = value
    updateUI()
  }

  func setTintOpacityMiddle(_ value: Double) {
    tintOpacityMiddle = value
    updateUI()
  }

  // MARK: - Child view routing

  override func addSubview(_ view: UIView) {
    if shouldKeepOnRoot(view) {
      super.addSubview(view)
      return
    }

    contentView.addSubview(view)
  }

  override func insertSubview(_ view: UIView, at index: Int) {
    if shouldKeepOnRoot(view) {
      super.insertSubview(view, at: index)
      return
    }

    let safeIndex = min(index, contentView.subviews.count)
    contentView.insertSubview(view, at: safeIndex)
  }

  override func willRemoveSubview(_ subview: UIView) {
    super.willRemoveSubview(subview)
  }

  private func shouldKeepOnRoot(_ view: UIView) -> Bool {
    if isSettingUpInternalViews { return true }
    if view === blurContainer { return true }
    if view === contentView { return true }
    if view === hostingController?.view { return true }
    if view.superview === blurContainer { return true }
    if view.superview === contentView { return true }
    return false
  }
}