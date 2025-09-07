import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import { Homepage } from "./components/Homepage";
import { Login } from "./components/Login";
import { CreateAccount } from "./components/CreateAccount";
import { SelectServices } from "./components/SelectServices";
import { RollOffServiceType } from "./components/RollOffServiceType";
import { RollOffPrioritySelection } from "./components/RollOffPrioritySelection";
import { RollOffWasteType } from "./components/RollOffWasteType";
import { RollOffServiceDetails } from "./components/RollOffServiceDetails";
import { CompactorServiceType } from "./components/CompactorServiceType";
import { CompactorEquipmentType } from "./components/CompactorEquipmentType";
import { CompactorExistingEquipmentType } from "./components/CompactorExistingEquipmentType";
import { CompactorReceiverBoxStatus } from "./components/CompactorReceiverBoxStatus";
import { CompactorOnsiteTrailer } from "./components/CompactorOnsiteTrailer";
import { CompactorWasteType } from "./components/CompactorWasteType";
import { CompactorFinancingOptions } from "./components/CompactorFinancingOptions";
import { JunkRemovalMaterials } from "./components/JunkRemovalMaterials";
import { JunkRemovalNotAccepted } from "./components/JunkRemovalNotAccepted";
import { CurrentContractInfo } from "./components/CurrentContractInfo";
import { TemporaryServiceDetails } from "./components/TemporaryServiceDetails";
import { ServiceDetails } from "./components/ServiceDetails";
import { SiteDetails } from "./components/SiteDetails";
import { PrioritySelection } from "./components/PrioritySelection";
import { HaulerResults } from "./components/HaulerResults";
import { HaulerProfile } from "./components/HaulerProfile";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { RequestSubmitted } from "./components/RequestSubmitted";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { HaulerDashboard } from "./components/HaulerDashboard";
import { BrokerDashboard } from "./components/BrokerDashboard";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { ContactUs } from "./components/ContactUs";
import { ClientAccounts } from "./components/ClientAccounts";
import { ActiveHaulers } from "./components/ActiveHaulers";
import { PropertySelection } from "./components/PropertySelection";
import { CustomerService } from "./components/CustomerService";
import { PropertySelectionForReview } from "./components/PropertySelectionForReview";
import { AccountReview } from "./components/AccountReview";
import { ContractCancellation } from "./components/ContractCancellation";
import { CancellationConfirmation } from "./components/CancellationConfirmation";
import { FrontLoadWasteType } from "./components/FrontLoadWasteType";
import { ActiveContracts } from "./components/ActiveContracts";
import { ContractReview } from "./components/ContractReview";
import { ContractQA } from "./components/ContractQA";
import { Messages } from "./components/Messages";
import { Invoices } from "./components/Invoices";
import { PaymentOptions } from "./components/PaymentOptions";
import { ManageAccount } from "./components/ManageAccount";
import { Quotes } from "./components/Quotes";
import { Proposals } from "./components/Proposals";
import { QuoteRequests } from "./components/QuoteRequests";
import { Settings } from "./components/Settings";
import { Support } from "./components/Support";

type Screen = 'homepage' | 'login' | 'create-account' | 'select-services' | 'frontload-waste-type' | 'rolloff-service-type' | 'rolloff-priority-selection' | 'rolloff-service-details' | 'rolloff-waste-type' | 'compactor-service-type' | 'compactor-equipment-type' | 'compactor-existing-equipment-type' | 'compactor-receiver-box-status' | 'compactor-onsite-trailer' | 'compactor-waste-type' | 'compactor-financing-options' | 'junk-removal-materials' | 'junk-removal-not-accepted' | 'current-contract-info' | 'temporary-service-details' | 'service-details' | 'site-details' | 'priority-selection' | 'hauler-results' | 'hauler-profile' | 'terms-and-conditions' | 'request-submitted' | 'dashboard' | 'about' | 'faq' | 'contact' | 'client-accounts' | 'active-haulers' | 'property-selection' | 'customer-service' | 'property-selection-review' | 'account-review' | 'contract-cancellation' | 'cancellation-confirmation' | 'active-contracts' | 'contract-review' | 'contract-qa' | 'messages' | 'invoices' | 'payment-options' | 'manage-account' | 'quotes' | 'proposals' | 'quote-requests' | 'settings' | 'support';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('homepage');
  const [isRollOffFlow, setIsRollOffFlow] = useState(false);
  const [isCompactorFlow, setIsCompactorFlow] = useState(false);
  const [isJunkRemovalFlow, setIsJunkRemovalFlow] = useState(false);
  const [rollOffServiceType, setRollOffServiceType] = useState<'temporary' | 'permanent' | ''>('');
  const [rollOffPriorities, setRollOffPriorities] = useState<string[]>([]);
  const [rollOffWasteType, setRollOffWasteType] = useState<'msw' | 'construction' | 'concrete' | 'glass' | 'industrial' | 'recycle' | ''>('');
  const [compactorServiceType, setCompactorServiceType] = useState<'equipment' | 'hauling' | 'both' | ''>('');
  const [compactorEquipmentType, setCompactorEquipmentType] = useState<'stationary' | 'self-contained' | 'vertical' | 'pre-crusher' | ''>('');
  const [compactorExistingEquipmentType, setCompactorExistingEquipmentType] = useState<'vertical-baler' | 'stationary-compactor' | ''>('');
  const [compactorReceiverBoxStatus, setCompactorReceiverBoxStatus] = useState<'have' | 'need' | ''>('');
  const [compactorOnsiteTrailerStatus, setCompactorOnsiteTrailerStatus] = useState<'have' | 'need' | ''>('');
  const [compactorWasteType, setCompactorWasteType] = useState<'msw' | 'warehouse' | 'construction' | 'recycle' | 'other' | ''>('');
  const [compactorFinancingType, setCompactorFinancingType] = useState<'lease' | 'finance' | 'purchase' | ''>('');
  const [junkRemovalMaterials, setJunkRemovalMaterials] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customerPriorities, setCustomerPriorities] = useState<string[]>([]);
  const [selectedHauler, setSelectedHauler] = useState<{ id: number; name: string } | null>(null);
  const [contractInfo, setContractInfo] = useState<any>(null);
  const [awaitingRollOffResponses, setAwaitingRollOffResponses] = useState(false);
  const [awaitingJunkRemovalResponses, setAwaitingJunkRemovalResponses] = useState(false);
  const [awaitingCompactorResponses, setAwaitingCompactorResponses] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [userType, setUserType] = useState<string>('waste-customers');
  const [preSelectedUserType, setPreSelectedUserType] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [cancellationData, setCancellationData] = useState<{
    isEarlyCancellation: boolean;
    reason: string;
    details: string;
  } | null>(null);
  const [frontLoadWasteType, setFrontLoadWasteType] = useState<'msw' | 'recycling' | 'both' | ''>('');
  const [selectedContractId, setSelectedContractId] = useState<number | null>(null);
  const [viewingHaulerProfileId, setViewingHaulerProfileId] = useState<number | null>(null);
  const [requestType, setRequestType] = useState<'temporary-rolloff' | 'compactor' | 'junk-removal' | ''>('');

  const handleReturnHome = () => {
    // Reset all state variables to their initial values
    setCurrentScreen('homepage');
    setIsRollOffFlow(false);
    setIsCompactorFlow(false);
    setIsJunkRemovalFlow(false);
    setRollOffServiceType('');
    setRollOffPriorities([]);
    setRollOffWasteType('');
    setCompactorServiceType('');
    setCompactorEquipmentType('');
    setCompactorExistingEquipmentType('');
    setCompactorReceiverBoxStatus('');
    setCompactorOnsiteTrailerStatus('');
    setCompactorWasteType('');
    setCompactorFinancingType('');
    setJunkRemovalMaterials([]);
    setSelectedServices([]);
    setCustomerPriorities([]);
    setSelectedHauler(null);
    setContractInfo(null);
    setAwaitingRollOffResponses(false);
    setAwaitingJunkRemovalResponses(false);
    setAwaitingCompactorResponses(false);
    setIsNewUser(false);
    setUserType('waste-customers');
    setPreSelectedUserType('');
    setSelectedProperty(null);
    setCancellationData(null);
    setFrontLoadWasteType('');
    setSelectedContractId(null);
    setViewingHaulerProfileId(null);
    setRequestType('');
  };

  const handleDashboardNavigation = (page: string) => {
    switch (page) {
      case 'about':
        setCurrentScreen('about');
        break;
      case 'faq':
        setCurrentScreen('faq');
        break;
      case 'contact':
        setCurrentScreen('contact');
        break;
      case 'dashboard':
        // Already on dashboard, do nothing
        break;
      case 'get-quote':
        setCurrentScreen('select-services');
        break;
      case 'client-accounts':
        setCurrentScreen('client-accounts');
        break;
      case 'active-haulers':
        setCurrentScreen('active-haulers');
        break;
      case 'customer-service':
        setCurrentScreen('property-selection');
        break;
      case 'review-account':
        setCurrentScreen('property-selection-review');
        break;
      case 'active-contracts':
        setCurrentScreen('active-contracts');
        break;
      case 'messages':
        setCurrentScreen('messages');
        break;
      case 'invoices':
        setCurrentScreen('invoices');
        break;
      case 'payment-options':
        setCurrentScreen('payment-options');
        break;
      case 'manage-account':
        setCurrentScreen('manage-account');
        break;
      case 'quotes':
        setCurrentScreen('quotes');
        break;
      case 'proposals':
        setCurrentScreen('proposals');
        break;
      case 'quote-requests':
        setCurrentScreen('quote-requests');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      case 'support':
        setCurrentScreen('support');
        break;
      default:
        break;
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'homepage':
        return (
          <Homepage 
            onGetQuotes={() => setCurrentScreen('create-account')}
            onLogin={() => {
              setCurrentScreen('login');
            }}
          />
        );
      case 'login':
        return (
          <Login 
            onBack={() => {
              setPreSelectedUserType('');
              setCurrentScreen('homepage');
            }}
            onLogin={(selectedUserType) => {
              setUserType(selectedUserType);
              setPreSelectedUserType('');
              setCurrentScreen('dashboard');
            }}
            preSelectedUserType={preSelectedUserType}
            onReturnHome={handleReturnHome}
          />
        );
      case 'create-account':
        return (
          <CreateAccount 
            onNext={(selectedUserType, formData) => {
              // Validate required fields
              if (!formData?.fullName?.trim()) {
                toast.error("Please enter your full name to continue.");
                return;
              }
              if (!formData?.email?.trim()) {
                toast.error("Please enter your email address to continue.");
                return;
              }
              if (!formData?.phone?.trim()) {
                toast.error("Please enter your phone number to continue.");
                return;
              }
              if (!formData?.businessName?.trim()) {
                toast.error("Please enter your business name to continue.");
                return;
              }
              if (!formData?.businessAddress?.trim()) {
                toast.error("Please enter your business address to continue.");
                return;
              }
              if (!formData?.industry?.trim()) {
                toast.error("Please select your industry to continue.");
                return;
              }
              setUserType(selectedUserType);
              setIsNewUser(true);
              setCurrentScreen('dashboard');
            }}
            onBack={() => setCurrentScreen('homepage')}
            onReturnHome={handleReturnHome}
          />
        );
      case 'select-services':
        return (
          <SelectServices 
            onContinue={(services) => {
              if (!services || services.length === 0) {
                toast.error("Please select at least one service to continue.");
                return;
              }
              setSelectedServices(services);
              setIsRollOffFlow(false);
              setIsCompactorFlow(false);
              setIsJunkRemovalFlow(false);
              if (services.includes('frontload')) {
                setCurrentScreen('frontload-waste-type');
              } else if (services.includes('compactor')) {
                setIsCompactorFlow(true);
                setCurrentScreen('compactor-service-type');
              } else if (services.includes('junkremoval')) {
                setIsJunkRemovalFlow(true);
                setCurrentScreen('junk-removal-materials');
              }
            }}
            onContinueWithRollOff={() => {
              setIsRollOffFlow(true);
              setIsCompactorFlow(false);
              setIsJunkRemovalFlow(false);
              setCurrentScreen('rolloff-service-type');
            }}
            onBack={() => {
              if (isNewUser) {
                setCurrentScreen('dashboard');
              } else {
                setCurrentScreen('create-account');
              }
            }}
            onReturnHome={handleReturnHome}
          />
        );
      case 'frontload-waste-type':
        return (
          <FrontLoadWasteType 
            onContinue={(wasteType) => {
              if (!wasteType) {
                toast.error("Please select a waste type to continue.");
                return;
              }
              setFrontLoadWasteType(wasteType);
              setCurrentScreen('current-contract-info');
            }}
            onBack={() => setCurrentScreen('select-services')}
          />
        );
      case 'rolloff-service-type':
        return (
          <RollOffServiceType 
            onContinue={(serviceType) => {
              if (!serviceType) {
                toast.error("Please select a service type to continue.");
                return;
              }
              setRollOffServiceType(serviceType);
              setCurrentScreen('rolloff-priority-selection');
            }}
            onBack={() => setCurrentScreen('select-services')}
          />
        );
      case 'rolloff-priority-selection':
        return (
          <RollOffPrioritySelection 
            onContinue={(priorities) => {
              if (!priorities || priorities.length === 0) {
                toast.error("Please select at least one priority to continue.");
                return;
              }
              setRollOffPriorities(priorities);
              if (rollOffServiceType === 'permanent') {
                setCurrentScreen('rolloff-service-details');
              } else {
                setCurrentScreen('rolloff-waste-type');
              }
            }}
            onBack={() => setCurrentScreen('rolloff-service-type')}
          />
        );
      case 'rolloff-service-details':
        return (
          <RollOffServiceDetails 
            onContinue={() => {
              setCurrentScreen('rolloff-waste-type');
            }}
            onBack={() => setCurrentScreen('rolloff-priority-selection')}
            onReturnHome={handleReturnHome}
          />
        );
      case 'rolloff-waste-type':
        return (
          <RollOffWasteType 
            onContinue={(wasteType) => {
              if (!wasteType) {
                toast.error("Please select a waste type to continue.");
                return;
              }
              setRollOffWasteType(wasteType);
              if (rollOffServiceType === 'permanent') {
                // For permanent roll-off with industrial or recycle waste, go directly to request submitted
                if (wasteType === 'industrial' || wasteType === 'recycle') {
                  setRequestType('temporary-rolloff'); // Use same request type for industrial/recycle permanent
                  setAwaitingRollOffResponses(true);
                  setCurrentScreen('request-submitted');
                } else {
                  setCurrentScreen('current-contract-info');
                }
              } else {
                // For temporary roll-off, continue to temporary service details
                setCurrentScreen('temporary-service-details');
              }
            }}
            onBack={() => {
              if (rollOffServiceType === 'permanent') {
                setCurrentScreen('rolloff-service-details');
              } else {
                setCurrentScreen('rolloff-priority-selection');
              }
            }}
            onReturnHome={handleReturnHome}
          />
        );
      case 'compactor-service-type':
        return (
          <CompactorServiceType 
            onContinue={(serviceType) => {
              if (!serviceType) {
                toast.error("Please select a service type to continue.");
                return;
              }
              setCompactorServiceType(serviceType);
              if (serviceType === 'equipment' || serviceType === 'both') {
                setCurrentScreen('compactor-equipment-type');
              } else if (serviceType === 'hauling') {
                setCurrentScreen('compactor-existing-equipment-type');
              }
            }}
            onBack={() => setCurrentScreen('select-services')}
          />
        );
      case 'compactor-equipment-type':
        return (
          <CompactorEquipmentType 
            onContinue={(equipmentType) => {
              if (!equipmentType) {
                toast.error("Please select an equipment type to continue.");
                return;
              }
              setCompactorEquipmentType(equipmentType);
              if (equipmentType === 'vertical') {
                setCurrentScreen('compactor-onsite-trailer');
              } else {
                if (compactorServiceType === 'both') {
                  setCurrentScreen('compactor-financing-options');
                } else {
                  setCurrentScreen('compactor-waste-type');
                }
              }
            }}
            onBack={() => setCurrentScreen('compactor-service-type')}
          />
        );
      case 'compactor-existing-equipment-type':
        return (
          <CompactorExistingEquipmentType 
            onContinue={(equipmentType) => {
              if (!equipmentType) {
                toast.error("Please select your existing equipment type to continue.");
                return;
              }
              setCompactorExistingEquipmentType(equipmentType);
              if (equipmentType === 'stationary-compactor') {
                setCurrentScreen('compactor-receiver-box-status');
              } else if (equipmentType === 'vertical-baler') {
                setCurrentScreen('compactor-onsite-trailer');
              } else {
                setCurrentScreen('current-contract-info');
              }
            }}
            onBack={() => setCurrentScreen('compactor-service-type')}
          />
        );
      case 'compactor-receiver-box-status':
        return (
          <CompactorReceiverBoxStatus 
            onContinue={(status) => {
              if (!status) {
                toast.error("Please select your receiver box status to continue.");
                return;
              }
              setCompactorReceiverBoxStatus(status);
              setCurrentScreen('current-contract-info');
            }}
            onBack={() => {
              if (compactorServiceType === 'both' && compactorEquipmentType !== 'vertical') {
                setCurrentScreen('compactor-financing-options');
              } else {
                setCurrentScreen('compactor-existing-equipment-type');
              }
            }}
          />
        );
      case 'compactor-onsite-trailer':
        return (
          <CompactorOnsiteTrailer 
            onContinue={(status) => {
              if (!status) {
                toast.error("Please select your onsite trailer status to continue.");
                return;
              }
              setCompactorOnsiteTrailerStatus(status);
              if (compactorServiceType === 'equipment') {
                setCurrentScreen('compactor-waste-type');
              } else if (compactorServiceType === 'both') {
                setCurrentScreen('compactor-financing-options');
              } else if (compactorServiceType === 'hauling') {
                setCurrentScreen('current-contract-info');
              }
            }}
            onBack={() => {
              if (compactorServiceType === 'hauling') {
                setCurrentScreen('compactor-existing-equipment-type');
              } else {
                setCurrentScreen('compactor-equipment-type');
              }
            }}
          />
        );
      case 'compactor-waste-type':
        return (
          <CompactorWasteType 
            onContinue={(wasteType) => {
              if (!wasteType) {
                toast.error("Please select a waste type to continue.");
                return;
              }
              setCompactorWasteType(wasteType);
              if (compactorServiceType === 'equipment') {
                setCurrentScreen('compactor-financing-options');
              } else {
                setCurrentScreen('site-details');
              }
            }}
            onBack={() => {
              if (compactorServiceType === 'equipment') {
                if (compactorEquipmentType === 'vertical') {
                  setCurrentScreen('compactor-onsite-trailer');
                } else {
                  setCurrentScreen('compactor-equipment-type');
                }
              } else if (compactorServiceType === 'both') {
                setCurrentScreen('current-contract-info');
              } else {
                setCurrentScreen('current-contract-info');
              }
            }}
          />
        );
      case 'compactor-financing-options':
        return (
          <CompactorFinancingOptions 
            onContinue={(financingType) => {
              if (!financingType) {
                toast.error("Please select a financing option to continue.");
                return;
              }
              setCompactorFinancingType(financingType);
              if (compactorServiceType === 'both') {
                if (compactorEquipmentType === 'vertical') {
                  setCurrentScreen('current-contract-info');
                } else {
                  setCurrentScreen('compactor-receiver-box-status');
                }
              } else {
                setCurrentScreen('current-contract-info');
              }
            }}
            onBack={() => {
              if (compactorEquipmentType === 'vertical') {
                setCurrentScreen('compactor-onsite-trailer');
              } else {
                setCurrentScreen('compactor-equipment-type');
              }
            }}
          />
        );
      case 'junk-removal-materials':
        return (
          <JunkRemovalMaterials 
            onContinue={(materials) => {
              if (!materials || materials.length === 0) {
                toast.error("Please select at least one material type to continue.");
                return;
              }
              setJunkRemovalMaterials(materials);
              setCurrentScreen('junk-removal-not-accepted');
            }}
            onBack={() => setCurrentScreen('select-services')}
          />
        );
      case 'junk-removal-not-accepted':
        return (
          <JunkRemovalNotAccepted 
            onContinue={() => {
              setCurrentScreen('service-details');
            }}
            onBack={() => setCurrentScreen('junk-removal-materials')}
          />
        );
      case 'current-contract-info':
        return (
          <CurrentContractInfo 
            onContinue={(info) => {
              // Validate that user has made a selection
              if (!info?.contractType) {
                toast.error("Please select your contract status to continue.");
                return;
              }
              // If they have an existing contract or out of contract, ensure required fields are filled
              if ((info.contractType === 'existing' || info.contractType === 'out-of-contract')) {
                if (!info.currentHauler?.trim()) {
                  toast.error("Please enter your hauler name to continue.");
                  return;
                }
                if (!info.contractEndDate?.trim()) {
                  toast.error("Please select your contract end date to continue.");
                  return;
                }
              }
              setContractInfo(info);
              if (isCompactorFlow && (compactorServiceType === 'hauling' || compactorServiceType === 'both')) {
                setCurrentScreen('compactor-waste-type');
              } else if (isCompactorFlow) {
                setCurrentScreen('site-details');
              } else {
                setCurrentScreen('service-details');
              }
            }}
            onBack={() => {
              if (isRollOffFlow && rollOffServiceType === 'permanent') {
                setCurrentScreen('rolloff-waste-type');
              } else if (isRollOffFlow) {
                setCurrentScreen('rolloff-waste-type');
              } else if (isCompactorFlow && compactorServiceType === 'equipment') {
                setCurrentScreen('compactor-financing-options');
              } else if (isCompactorFlow && compactorServiceType === 'both') {
                if (compactorEquipmentType === 'vertical') {
                  setCurrentScreen('compactor-financing-options');
                } else {
                  setCurrentScreen('compactor-receiver-box-status');
                }
              } else if (isCompactorFlow && compactorServiceType === 'hauling') {
                if (compactorExistingEquipmentType === 'stationary-compactor') {
                  setCurrentScreen('compactor-receiver-box-status');
                } else if (compactorExistingEquipmentType === 'vertical-baler') {
                  setCurrentScreen('compactor-onsite-trailer');
                } else {
                  setCurrentScreen('compactor-existing-equipment-type');
                }
              } else if (isCompactorFlow) {
                setCurrentScreen('compactor-service-type');
              } else if (selectedServices.includes('frontload')) {
                setCurrentScreen('frontload-waste-type');
              } else {
                setCurrentScreen('select-services');
              }
            }}
          />
        );
      case 'temporary-service-details':
        return (
          <TemporaryServiceDetails 
            onFindHauler={() => {
              setRequestType('temporary-rolloff');
              setAwaitingRollOffResponses(true);
              setCurrentScreen('request-submitted');
            }}
            onBack={() => setCurrentScreen('rolloff-waste-type')}
          />
        );
      case 'service-details':
        return (
          <ServiceDetails 
            onFindMatches={(formData) => {
              // Validate required fields based on service type
              if (isJunkRemovalFlow) {
                if (!formData?.streetAddress?.trim()) {
                  toast.error("Please enter a street address to continue.");
                  return;
                }
                if (!formData?.city?.trim()) {
                  toast.error("Please enter a city to continue.");
                  return;
                }
                if (!formData?.state?.trim()) {
                  toast.error("Please enter a state to continue.");
                  return;
                }
                if (!formData?.zipCode?.trim()) {
                  toast.error("Please enter a zip code to continue.");
                  return;
                }
                if (!formData?.contactName?.trim()) {
                  toast.error("Please enter a contact name to continue.");
                  return;
                }
                if (!formData?.contactPhone?.trim()) {
                  toast.error("Please enter a contact phone number to continue.");
                  return;
                }
                setRequestType('junk-removal');
                setAwaitingJunkRemovalResponses(true);
                setCurrentScreen('request-submitted');
              } else if (selectedServices.includes('frontload')) {
                // Validate front load service configuration
                if (frontLoadWasteType === 'both') {
                  if (!formData?.zipCode?.trim()) {
                    toast.error("Please enter a zip code to continue.");
                    return;
                  }
                  if (!formData?.mswConfig?.containerSize) {
                    toast.error("Please select an MSW container size to continue.");
                    return;
                  }
                  if (!formData?.mswConfig?.frequency) {
                    toast.error("Please select an MSW pickup frequency to continue.");
                    return;
                  }
                  if (!formData?.recyclingConfig?.containerSize) {
                    toast.error("Please select a recycling container size to continue.");
                    return;
                  }
                  if (!formData?.recyclingConfig?.frequency) {
                    toast.error("Please select a recycling pickup frequency to continue.");
                    return;
                  }
                } else {
                  if (!formData?.zipCode?.trim()) {
                    toast.error("Please enter a zip code to continue.");
                    return;
                  }
                  if (!formData?.containerSize) {
                    toast.error("Please select a container size to continue.");
                    return;
                  }
                  if (!formData?.frequency) {
                    toast.error("Please select a pickup frequency to continue.");
                    return;
                  }
                }
                setCurrentScreen('priority-selection');
              } else if (isRollOffFlow) {
                setCurrentScreen('hauler-results');
              } else {
                setCurrentScreen('hauler-results');
              }
            }}
            onBack={() => {
              if (isJunkRemovalFlow) {
                setCurrentScreen('junk-removal-not-accepted');
              } else if (selectedServices.includes('frontload') || (isRollOffFlow && rollOffServiceType === 'permanent')) {
                setCurrentScreen('current-contract-info');
              } else if (isRollOffFlow) {
                setCurrentScreen('rolloff-priority-selection');
              } else {
                setCurrentScreen('select-services');
              }
            }}
            isCompactorFlow={false}
            isJunkRemovalFlow={isJunkRemovalFlow}
            isRollOffFlow={isRollOffFlow}
            frontLoadWasteType={frontLoadWasteType}
          />
        );
      case 'site-details':
        return (
          <SiteDetails 
            onFindMatches={(formData) => {
              // Validate required fields
              if (!formData?.businessName?.trim()) {
                toast.error("Please enter your business name to continue.");
                return;
              }
              if (!formData?.address?.trim()) {
                toast.error("Please enter a site address to continue.");
                return;
              }
              if (!formData?.contactName?.trim()) {
                toast.error("Please enter a contact name to continue.");
                return;
              }
              if (!formData?.phoneNumber?.trim()) {
                toast.error("Please enter a phone number to continue.");
                return;
              }
              if (!formData?.email?.trim()) {
                toast.error("Please enter an email address to continue.");
                return;
              }
              setRequestType('compactor');
              setAwaitingCompactorResponses(true);
              setCurrentScreen('request-submitted');
            }}
            onBack={() => {
              if (compactorServiceType === 'hauling' || compactorServiceType === 'both') {
                setCurrentScreen('compactor-waste-type');
              } else {
                setCurrentScreen('current-contract-info');
              }
            }}
            onReturnHome={handleReturnHome}
          />
        );
      case 'request-submitted':
        return requestType ? (
          <RequestSubmitted 
            requestType={requestType}
            onReturnToDashboard={() => {
              setCurrentScreen('dashboard');
            }}
            onReturnHome={handleReturnHome}
          />
        ) : null;
      case 'priority-selection':
        return (
          <PrioritySelection 
            onContinue={(priorities) => {
              if (!priorities || priorities.length === 0) {
                toast.error("Please select at least one priority to continue.");
                return;
              }
              setCustomerPriorities(priorities);
              setCurrentScreen('hauler-results');
            }}
            onBack={() => setCurrentScreen('service-details')}
          />
        );
      case 'hauler-results':
        return (
          <HaulerResults 
            priorities={isRollOffFlow ? rollOffPriorities : customerPriorities}
            onSelectHauler={() => setCurrentScreen('dashboard')}
            onViewProfile={(haulerId) => {
              if (!haulerId) {
                toast.error("Please select a hauler to view their profile.");
                return;
              }
              setViewingHaulerProfileId(haulerId);
              setCurrentScreen('hauler-profile');
            }}
            onViewTerms={(haulerId, haulerName) => {
              if (!haulerId || !haulerName) {
                toast.error("Please select a hauler to view terms and conditions.");
                return;
              }
              setSelectedHauler({ id: haulerId, name: haulerName });
              setCurrentScreen('terms-and-conditions');
            }}
            onBack={() => {
              if (selectedServices.includes('frontload')) {
                setCurrentScreen('priority-selection');
              } else if (isRollOffFlow) {
                setCurrentScreen('service-details');
              } else {
                setCurrentScreen('service-details');
              }
            }}
            onReturnHome={handleReturnHome}
            isRollOffFlow={isRollOffFlow}
            isFrontLoadFlow={selectedServices.includes('frontload')}
            frontLoadWasteType={frontLoadWasteType}
          />
        );
      case 'hauler-profile':
        return viewingHaulerProfileId ? (
          <HaulerProfile 
            haulerId={viewingHaulerProfileId}
            onBack={() => setCurrentScreen('hauler-results')}
            onReturnHome={handleReturnHome}
            onSelectHauler={() => setCurrentScreen('dashboard')}
            onViewTerms={(haulerId, haulerName) => {
              if (!haulerId || !haulerName) {
                toast.error("Please select a hauler to view terms and conditions.");
                return;
              }
              setSelectedHauler({ id: haulerId, name: haulerName });
              setCurrentScreen('terms-and-conditions');
            }}
          />
        ) : null;
      case 'terms-and-conditions':
        return selectedHauler ? (
          <TermsAndConditions 
            haulerId={selectedHauler.id}
            haulerName={selectedHauler.name}
            onBack={() => {
              if (viewingHaulerProfileId) {
                setCurrentScreen('hauler-profile');
              } else {
                setCurrentScreen('hauler-results');
              }
            }}
          />
        ) : null;
      case 'dashboard':
        if (userType === 'hauler') {
          return (
            <HaulerDashboard 
              onHome={() => {
                setAwaitingRollOffResponses(false);
                setAwaitingJunkRemovalResponses(false);
                setAwaitingCompactorResponses(false);
                setIsNewUser(false);
                setCurrentScreen('homepage');
              }}
              onBack={() => setCurrentScreen('homepage')}
              onNavigate={handleDashboardNavigation}
            />
          );
        } else if (userType === 'broker') {
          return (
            <BrokerDashboard 
              onHome={() => {
                setAwaitingRollOffResponses(false);
                setAwaitingJunkRemovalResponses(false);
                setAwaitingCompactorResponses(false);
                setIsNewUser(false);
                setCurrentScreen('homepage');
              }}
              onBack={() => setCurrentScreen('homepage')}
              onNavigate={handleDashboardNavigation}
            />
          );
        } else {
          return (
            <CustomerDashboard 
              onHome={() => {
                setAwaitingRollOffResponses(false);
                setAwaitingJunkRemovalResponses(false);
                setAwaitingCompactorResponses(false);
                setIsNewUser(false);
                setCurrentScreen('homepage');
              }}
              onContinueToQuote={isNewUser ? () => {
                setIsNewUser(false);
                setCurrentScreen('select-services');
              } : undefined}
              awaitingRollOffResponses={awaitingRollOffResponses}
              awaitingJunkRemovalResponses={awaitingJunkRemovalResponses}
              awaitingCompactorResponses={awaitingCompactorResponses}
              onBack={() => setCurrentScreen('homepage')}
              onNavigate={handleDashboardNavigation}
            />
          );
        }
      case 'about':
        return (
          <About 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'faq':
        return (
          <FAQ 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'contact':
        return (
          <ContactUs 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'client-accounts':
        return (
          <ClientAccounts 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'active-haulers':
        return (
          <ActiveHaulers 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'property-selection':
        return (
          <PropertySelection 
            onSelectProperty={(property) => {
              if (!property) {
                toast.error("Please select a property to continue.");
                return;
              }
              setSelectedProperty(property);
              setCurrentScreen('customer-service');
            }}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'customer-service':
        return selectedProperty ? (
          <CustomerService 
            selectedProperty={selectedProperty}
            onBack={() => setCurrentScreen('property-selection')}
            onSubmit={() => {
              setSelectedProperty(null);
              setCurrentScreen('dashboard');
            }}
          />
        ) : null;
      case 'property-selection-review':
        return (
          <PropertySelectionForReview 
            onSelectProperty={(property) => {
              if (!property) {
                toast.error("Please select a property to continue.");
                return;
              }
              setSelectedProperty(property);
              setCurrentScreen('account-review');
            }}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'account-review':
        return selectedProperty ? (
          <AccountReview 
            selectedProperty={selectedProperty}
            onBack={() => setCurrentScreen('property-selection-review')}
            onCancelContract={(property, isEarly) => {
              if (!property) {
                toast.error("Please select a property to cancel the contract.");
                return;
              }
              setSelectedProperty(property);
              setCancellationData({
                isEarlyCancellation: isEarly,
                reason: '',
                details: ''
              });
              setCurrentScreen('contract-cancellation');
            }}
          />
        ) : null;
      case 'contract-cancellation':
        return selectedProperty && cancellationData ? (
          <ContractCancellation 
            selectedProperty={selectedProperty}
            isEarlyCancellation={cancellationData.isEarlyCancellation}
            onBack={() => setCurrentScreen('account-review')}
            onConfirmCancellation={(reason, details) => {
              if (!reason) {
                toast.error("Please select a cancellation reason to continue.");
                return;
              }
              setCancellationData({
                ...cancellationData,
                reason,
                details
              });
              setCurrentScreen('cancellation-confirmation');
            }}
          />
        ) : null;
      case 'cancellation-confirmation':
        return selectedProperty && cancellationData ? (
          <CancellationConfirmation 
            selectedProperty={selectedProperty}
            isEarlyCancellation={cancellationData.isEarlyCancellation}
            cancellationReason={cancellationData.reason}
            additionalDetails={cancellationData.details}
            onBack={() => setCurrentScreen('contract-cancellation')}
            onSendCancellation={() => {
              setCancellationData(null);
              setSelectedProperty(null);
              setCurrentScreen('dashboard');
            }}
          />
        ) : null;
      case 'active-contracts':
        return (
          <ActiveContracts 
            onBack={() => setCurrentScreen('dashboard')}
            onViewContract={(contractId) => {
              if (!contractId) {
                toast.error("Please select a contract to view.");
                return;
              }
              setSelectedContractId(contractId);
              setCurrentScreen('contract-review');
            }}
            onAskQuestion={(contractId) => {
              if (!contractId) {
                toast.error("Please select a contract to ask a question about.");
                return;
              }
              setSelectedContractId(contractId);
              setCurrentScreen('contract-qa');
            }}
          />
        );
      case 'contract-review':
        return selectedContractId ? (
          <ContractReview 
            contractId={selectedContractId}
            onBack={() => setCurrentScreen('active-contracts')}
          />
        ) : null;
      case 'contract-qa':
        return selectedContractId ? (
          <ContractQA 
            contractId={selectedContractId}
            onBack={() => setCurrentScreen('active-contracts')}
          />
        ) : null;
      case 'messages':
        return (
          <Messages 
            onBack={() => setCurrentScreen('dashboard')}
            userType={userType}
          />
        );
      case 'invoices':
        return (
          <Invoices 
            onBack={() => setCurrentScreen('dashboard')}
            userType={userType}
          />
        );
      case 'payment-options':
        return (
          <PaymentOptions 
            onBack={() => setCurrentScreen('dashboard')}
            userType={userType}
          />
        );
      case 'manage-account':
        return (
          <ManageAccount 
            onBack={() => setCurrentScreen('dashboard')}
            userType={userType}
          />
        );
      case 'quotes':
        return (
          <Quotes 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'proposals':
        return (
          <Proposals 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'quote-requests':
        return (
          <QuoteRequests 
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      case 'settings':
        return (
          <Settings 
            onBack={() => setCurrentScreen('dashboard')}
            userType={userType}
          />
        );
      case 'support':
        return (
          <Support 
            onBack={() => setCurrentScreen('dashboard')}
            userType={userType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Toaster />
      <div className="relative">
        {/* iPhone 16 Pro Frame */}
        <div 
          className="bg-black rounded-[3rem] p-2 shadow-2xl"
          style={{ width: '446px', height: '948px' }}
        >
          {/* Screen Area */}
          <div 
            className="bg-white rounded-[2.5rem] overflow-hidden relative"
            style={{ width: '430px', height: '932px' }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full h-8 w-32 z-10"></div>
            
            {/* Content Area */}
            <div className="h-full w-full bg-background flex flex-col">
              {/* Status Bar Area */}
              <div className="h-12 flex items-center justify-between px-6 pt-2">
                <span className="text-sm">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="text-sm">100%</div>
                  <div className="w-6 h-3 border border-black rounded-sm">
                    <div className="w-full h-full bg-green-500 rounded-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden">
                {renderCurrentScreen()}
              </div>
              
              {/* Home Indicator */}
              <div className="flex justify-center pb-2">
                <div className="w-32 h-1 bg-black rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Frame Label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm text-gray-600">Waste Geek Customer App</p>
        </div>
      </div>
    </div>
  );
}