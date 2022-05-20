enum ResultView {
  Map = 'Map',
  List = 'List',
}

export const resultView: Record<ResultView, string> = {
  [ ResultView.Map ]: 'Map',
  [ ResultView.List ]: 'List',
};

export const possibleResultViews: ResultView[] =
  (Object.keys(ResultView) as Array<ResultView>);

export default ResultView;
