var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var OfferInfo = require('../helpers/offer.jsx');
var FormInput = require('./form_input.jsx');
var FormDropdown = require('./form_dropdown.jsx');
var HelpBlock = Bootstrap.HelpBlock;

var SurveyModal = React.createClass({
  propTypes: {
    hideSurvey: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      university: '',
      ethnicity: '',
      gender: '',
      company: '',
      companyType: '',
      positionType: '',
      baseSalary: '',
      signingBonus: '',
      equityPercent: '',
      equityAmount: '',
      companyLocation: '',
    };
  },

  checkValidationAndSubmit: function() {
    var invalidFields = [];
    var newState = this.state;
    if (this.state.university.length < 2) {
      newState.universityValid = {
        status: 'error',
        message: 'Invalid university length.'
      };
      invalidFields.push('University');
    } else {
      newState.universityValid = null;
    }
    if (OfferInfo.ethnicity.indexOf(this.state.ethnicity) == -1) {
      newState.ethnicityValid = {
        status: 'error',
        message: 'Invalid ethnicity choice.'
      };
      invalidFields.push('Ethnicity');
    } else {
      newState.ethnicityValid = null;
    }
    if (OfferInfo.gender.indexOf(this.state.gender) == -1) {
      newState.genderValid = {
        status: 'error',
        message: 'Invalid gender choice.'
      };
      invalidFields.push('Gender');
    } else {
      newState.genderValid = null;
    }
    if (this.state.company.length < 2) {
      newState.companyValid = {
        status: 'error',
        message: 'Invalid company name length.'
      };
      invalidFields.push('Company');
    } else {
      newState.companyValid = null;
    }
    if (OfferInfo.company.map(c => c.name).indexOf(this.state.companyType) == -1) {
      newState.companyTypeValid = {
        status: 'error',
        message: 'Invalid company type choice.'
      };
      invalidFields.push('Company Type');
    } else {
      newState.companyTypeValid = null;
    }
    if (this.state.positionType.length < 2) {
      newState.positionTypeValid = {
        status: 'error',
        message: 'Invalid position name length.'
      };
      invalidFields.push('Position');
    } else {
      newState.positionTypeValid = null;
    }
    if (!$.isNumeric(this.state.baseSalary) || this.state.baseSalary.length == 0) {
      newState.baseSalaryValid = {
        status: 'error',
        message: 'Base salary must be numeric.'
      };
      invalidFields.push('Base Salary');
    } else {
      newState.baseSalaryValid = null;
    }
    if (!$.isNumeric(this.state.signingBonus)) {
      newState.signingBonusValid = {
        status: 'error',
        message: 'Signing bonus must be numeric.'
      };
      invalidFields.push('Signing Bonus');
    } else {
      newState.signingBonusValid = null;
    }
    if (!$.isNumeric(this.state.equityPercent) && this.state.equityPercent.length > 0) {
      newState.equityPercentValid = {
        status: 'error',
        message: 'Equity percent must be numeric.'
      };
      invalidFields.push('Equity Percent');
    } else {
      newState.equityPercentValid = null;
    }
    if (!$.isNumeric(this.state.equityAmount) && this.state.equityAmount.length > 0) {
      newState.equityAmountValid = {
        status: 'error',
        message: 'Equity amount must be numeric.'
      };
      invalidFields.push('Equity Amount');
    } else {
      newState.equityAmountValid = null;
    }
    if (OfferInfo.loc.indexOf(this.state.companyLocation) == -1) {
      newState.companyLocationValid = {
        status: 'error',
        message: 'Invalid company location choice.'
      };
      invalidFields.push('Company Location');
    } else {
      newState.companyLocationValid = null
    }
    if (invalidFields.length > 0) {
      newState.invalidFieldsMessage = "Invalid fields: " + invalidFields.join(", ");
    }
    this.setState(newState);
    if (invalidFields.length == 0) {
      this.submitForm();
    }
  },

  submitForm: function() {
    var that = this;
    $.post("/submit", {
      university: this.state.university,
      ethnicity: this.state.ethnicity,
      gender: this.state.gender,
      company: this.state.company,
      companyType: this.state.companyType,
      positionType: this.state.positionType,
      baseSalary: this.state.baseSalary,
      signingBonus: this.state.signingBonus,
      equityPercent: this.state.equityPercent,
      equityAmount: this.state.equityAmount,
      companyLocation: this.state.companyLocation
    }).done(function( data ) {
      if (!data.success) {
        that.setState({invalidFieldsMessage: data.message});
      } else {
        that.hideSurvey();
      }
    });
  },

  renderAuthModalBody: function() {
    return (<Modal.Body>
      <p className='p-modal'>
        Contribute to this project by adding your own new-grad salary data.
      </p>
      <div className='center-align'>
        <a href='/auth/facebook'>
          <Button id='login-with-fb-btn'>
            <i className='fa fa-facebook-official' aria-hidden='true'></i>
            Continue with Facebook
          </Button>
        </a>
      </div>
      <p className='p-modal'>
        Note: Facebook authentication is used to prevent duplicate responses. Your identification information will never be shown in association with your survey response.
      </p>
    </Modal.Body>);
  },

  renderSurveyModalBody: function() {
    return (
      <Modal.Body>
        <form>
          <FormInput
            label='University'
            onChange={val => this.setState({university:val})}
            validationState={this.state.universityValid}/>
          <FormDropdown
            label='Ethnicity'
            options={OfferInfo.ethnicity}
            keyName='ethnicity'
            onChange={val => this.setState({ethnicity:val})}
            validationState={this.state.ethnicityValid}/>
          <FormDropdown
            label='Gender'
            options={OfferInfo.gender}
            keyName='gender'
            onChange={val => this.setState({gender:val})}
            validationState={this.state.genderValid}
          />
          <FormInput
            label='Company'
            onChange={val => this.setState({company:val})}
            validationState={this.state.companyValid}/>
          <FormDropdown
            label='Company Type'
            options={OfferInfo.company.map(c => c.name)}
            keyName='companytype'
            onChange={val => this.setState({companyType:val})}
            validationState={this.state.companyTypeValid}/>
          <FormInput
            label='Position'
            onChange={val => this.setState({positionType: val})}
            validationState={this.state.positionTypeValid}/>
          <FormInput
            label='Base Salary'
            onChange={val => this.setState({baseSalary: val})}
            validationState={this.state.baseSalaryValid}
            placeholder='e.g. 100000, 125000, etc.'
            before='$'/>
          <FormInput
            label='Signing Bonus'
            onChange={val => this.setState({signingBonus: val})}
            validationState={this.state.signingBonusValid}
            placeholder='e.g. 5000, 10000, etc.'
            before='$'/>
          <FormInput
            label='Equity Percent'
            onChange={val => this.setState({equityPercent: val})}
            validationState={this.state.equityPercentValid}
            placeholder='(optional)'
            after='%'/>
          <FormInput
            label='Equity Amount'
            onChange={val => this.setState({equityAmount: val})}
            validationState={this.state.equityAmountValid}
            placeholder='(optional)'
            before='$'/>
          <FormDropdown
            label='Company Location'
            options={OfferInfo.loc}
            keyName='location'
            onChange={val => this.setState({companyLocation: val})}
            validationState={this.state.companyLocationValid}/>
        </form>
      </Modal.Body>
    );
  },

  render: function() {
    var submitButton;
    if (this.props.isAuthenticated) {
      submitButton = (<Button bsStyle='primary' onClick={this.checkValidationAndSubmit}>Submit</Button>);
    }
    var modalContent;
    var surveyMsg = null;
    if (this.props.isAuthenticated) {
      modalContent = this.renderSurveyModalBody();
      surveyMsg = (<p>Please only submit a response for the offer you accepted.</p>);
    } else {
      modalContent = this.renderAuthModalBody();
    }

    var errorMsg = null;
    if (this.state.invalidFieldsMessage) {
      errorMsg = (<HelpBlock className="error-color">{this.state.invalidFieldsMessage}</HelpBlock>);
    }
    return (
      <div className='static-modal'>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Take the survey!</Modal.Title>
            {surveyMsg}
          </Modal.Header>
          {modalContent}
          <Modal.Footer>
            {errorMsg}
            <Button onClick={this.props.hideSurvey}>Close</Button>
            {submitButton}
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
});

module.exports = SurveyModal;
