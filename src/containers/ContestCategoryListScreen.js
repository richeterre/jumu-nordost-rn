// @flow
import type { NavigationScreenProp } from 'react-navigation'
import type { State } from '../redux/modules'
import type { Contest, ContestCategory } from '../redux/modules/contests'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListView, StyleSheet } from 'react-native'

import ContestCategoryCell from '../components/ContestCategoryCell'
import Separator from '../components/Separator'
import colors from '../constants/colors'

type PropsFromParent = {|
  navigation: NavigationScreenProp,
|}

type PropsFromState = {|
  contest: ?Contest,
|}

type Props = PropsFromParent & PropsFromState

type ComponentState = {|
  dataSource: ListView.DataSource,
|}

class ContestCategoryListScreen extends Component {
  props: Props
  state: ComponentState

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource: dataSource.cloneWithRows(props.contest.contestCategories),
    }
  }

  render() {
    return (
      <ListView
        style={styles.root}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this.renderSeparator}
        enableEmptySections={true}
      />
    )
  }

  renderRow(contestCategory: ContestCategory) {
    return (
      <ContestCategoryCell
        key={contestCategory.id}
        onSelect={() => this.selectContestCategory(contestCategory)}
        contestCategory={contestCategory}
      />
    )
  }

  renderSeparator(sectionID: string, rowID: string) {
    return (
      <Separator
        style={styles.separator}
        key={`separator-${sectionID}-${rowID}`}
      />
    )
  }

  selectContestCategory(contestCategory: ContestCategory) {
    const { navigate } = this.props.navigation
    navigate('ResultList', { contestCategory })
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
  },
  separator: {
    marginLeft: 16,
  },
})

function mapStateToProps(state: State): PropsFromState {
  return {
    contest: state.contests.currentContest,
  }
}

export default connect(mapStateToProps)(ContestCategoryListScreen)
