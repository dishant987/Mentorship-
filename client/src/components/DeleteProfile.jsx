import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import PropTypes from 'prop-types'

export function DeleteProfileConfirmation({ onConfirm, onCancel }) {
    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Profile</DialogTitle>
                </DialogHeader>
                <div>
                    <p>Are you sure you want to delete your profile? This action cannot be undone.</p>
                </div>
                <DialogFooter className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

DeleteProfileConfirmation.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
